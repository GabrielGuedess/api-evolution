import { prisma } from 'database/prismaClient';

import { redis } from 'cache';

import { ICreatePlatformDTO } from 'modules/platforms/dtos/ICreatePlatformDTO';

import { AppError } from 'shared/errors/AppError';

export class CreatePlatformUseCase {
  async execute({ name, slug }: ICreatePlatformDTO) {
    const platformExists = await prisma.platform.findFirst({
      where: {
        slug,
      },
    });

    if (platformExists) {
      throw new AppError('Platform already Exists!');
    }

    await redis.flushdb();

    const platform = await prisma.platform.create({
      data: {
        name,
        slug,
      },
    });

    return platform;
  }
}
