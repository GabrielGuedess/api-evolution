import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { resolve } from 'path';

import { prisma } from 'database/prismaClient';

import { IUploadAvatarClientDTO } from 'modules/clients/dtos/IUploadAvatarClientDTO';

import { AppError } from 'shared/errors/AppError';

import upload from 'config/upload';

export class UploadAvatarClientUseCase {
  async execute({ avatar, client_id }: IUploadAvatarClientDTO) {
    const clientExistsEmail = await prisma.client.findFirst({
      where: {
        id: client_id,
      },
    });

    if (!clientExistsEmail) {
      throw new AppError('Client does not Exists!', 403);
    }

    let avatarImage;

    if (!!avatar) {
      const pathAvatar = resolve(upload.tmpFolder, avatar);

      avatarImage = await cloudinary.uploader
        .upload(pathAvatar, {
          folder: 'avatars',
          secure: true,
          public_id: clientExistsEmail.username,
        })
        .catch(async err => {
          throw new AppError(err.message);
        })
        .finally(async () => {
          await fs.promises.unlink(pathAvatar);
        });
    }

    const client = await prisma.client.update({
      where: {
        id: client_id,
      },
      data: {
        avatar: avatarImage?.url ?? null,
      },
    });

    return client;
  }
}
