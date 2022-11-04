import 'dotenv/config';

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { resolve } from 'path';

import { prisma } from 'database/prismaClient';

import { redis } from 'cache';

import { ICreateGalleryDTO } from 'modules/gallery/dtos/ICreateGalleryDTO';

import { AppError } from 'shared/errors/AppError';

import upload from 'config/upload';

export class CreateGalleryUseCase {
  async execute({
    image,
    alt,
    image_fit,
    width,
    height,
    type,
    games_id,
  }: ICreateGalleryDTO) {
    const pathImage = resolve(upload.tmpFolder, image);

    await redis.flushdb();

    const game = await prisma.game.findFirst({
      where: {
        id: games_id,
      },
      select: {
        slug: true,
      },
    });

    const gameImage = await cloudinary.uploader
      .upload(pathImage, {
        folder: `gamesGallery/${game?.slug}`,
        resource_type: 'auto',
      })
      .catch(async err => {
        throw new AppError(err.message);
      })
      .finally(async () => {
        await fs.promises.unlink(pathImage);
      });

    const imageCard = await prisma.game_Gallery.create({
      data: {
        src: gameImage.url,
        alt,
        image_fit,
        width: +width,
        height: +height,
        type,
        games_id,
      },
    });

    return imageCard;
  }
}
