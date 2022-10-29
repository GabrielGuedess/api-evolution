import { hash } from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { resolve } from 'path';

import { prisma } from 'database/prismaClient';

import { ICreateClientDTO } from 'modules/clients/dtos/ICreateClientDTO';

import { AppError } from 'shared/errors/AppError';

import upload from 'config/upload';

export class CreateClientUseCase {
  async execute({
    email,
    username,
    avatar,
    password,
    name,
    lastname,
    cpf,
    cellphone,
    date,
    cep,
    logradouro,
    numero,
    complemento,
    referencia,
    bairro,
    cidade,
    UF,
  }: ICreateClientDTO) {
    const clientExistsEmail = await prisma.client.findFirst({
      where: {
        email: {
          mode: 'insensitive',
          equals: email,
        },
      },
    });

    const clientExistsUsername = await prisma.client.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username,
        },
      },
    });

    if (clientExistsEmail || clientExistsUsername) {
      throw new AppError('Client already Exists!', 403);
    }

    const hashPassword = await hash(password, 10);

    let avatarImage;

    if (!!avatar) {
      const pathAvatar = resolve(upload.tmpFolder, avatar);

      avatarImage = await cloudinary.uploader
        .upload(pathAvatar, {
          folder: 'avatars',
          public_id: username,
        })
        .catch(async err => {
          throw new AppError(err.message);
        })
        .finally(async () => {
          await fs.promises.unlink(pathAvatar);
        });
    }

    const client = await prisma.client.create({
      data: {
        email,
        username,
        avatar: avatarImage?.url ?? null,
        password: hashPassword,
        name,
        lastname,
        cpf,
        cellphone,
        date,
        cep,
        logradouro,
        numero,
        complemento,
        referencia,
        bairro,
        cidade,
        UF,
      },
    });

    return client;
  }
}