import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { resolve } from 'path';

import { prisma } from 'database/prismaClient';

import { ICreateGameDTO } from 'modules/games/dtos/ICreateGameDTO';

import { AppError } from 'shared/errors/AppError';

import Vibrant = require('node-vibrant');

import upload from 'config/upload';

export class CreateGameUseCase {
  async execute({
    name,
    slug,
    release_date,
    score,
    video,
    image,
    background,
    description,
    price,
    genres,
    developers,
    platforms,
  }: ICreateGameDTO) {
    const gameExists = await prisma.game.findFirst({
      where: {
        slug: {
          mode: 'insensitive',
          equals: slug,
        },
      },
    });

    if (gameExists) {
      throw new AppError('Game already Exists!');
    }

    const pathImage = resolve(upload.tmpFolder, image);
    const pathBackground = resolve(upload.tmpFolder, background);
    const pathVideo = resolve(upload.tmpFolder, video);

    const color = await Vibrant.from(pathImage).getPalette();

    if (!color.LightMuted?.hex) {
      throw new AppError('Error generate primary color');
    }

    console.log(color);

    const imageCard = await cloudinary.uploader
      .upload(pathImage, {
        folder: 'imagesCard',
      })
      .catch(async err => {
        throw new AppError(err.message);
      })
      .finally(async () => {
        await fs.promises.unlink(pathImage);
      });

    const imageBackground = await cloudinary.uploader
      .upload(pathBackground, {
        folder: 'imagesBackground',
      })
      .catch(async err => {
        throw new AppError(err.message);
      })
      .finally(async () => {
        await fs.promises.unlink(pathBackground);
      });

    const imageVideo = await cloudinary.uploader
      .upload(pathVideo, {
        folder: 'videosBackground',
        resource_type: 'video',
      })
      .catch(async err => {
        throw new AppError(err.message);
      })
      .finally(async () => {
        await fs.promises.unlink(pathVideo);
      });

    const game = await prisma.game
      .create({
        data: {
          name,
          slug,
          release_date,
          score: +score,
          video: imageVideo.url,
          image: imageCard.url,
          primary_color: color.LightMuted?.hex,
          background: imageBackground.url,
          description,
          price: +price,
          genres: {
            connect: [
              ...genres.map(genre => ({
                id: genre,
              })),
            ],
          },
          developers: {
            connect: [
              ...developers.map(developer => ({
                id: developer,
              })),
            ],
          },
          platforms: {
            connect: [
              ...platforms.map(platform => ({
                id: platform,
              })),
            ],
          },
        },
        include: {
          genres: true,
          developers: true,
          platforms: true,
          games_gallery: true,
          games_favorites: true,
          order: true,
        },
      })
      .catch(err => {
        throw new AppError(err.message);
      });

    return game;
  }
}
