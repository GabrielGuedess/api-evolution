import { prisma } from 'database/prismaClient';

import { redis } from 'cache';

import { ICreatePcSystemDTO } from 'modules/system/dtos/ICreatePcSystemDTO';

import { AppError } from 'shared/errors/AppError';

export class CreatePcSystemUseCase {
  async execute({ game_id, minimal, recommended }: ICreatePcSystemDTO) {
    const platformExists = await prisma.pcSystem.findFirst({
      where: {
        game_id,
      },
    });

    if (platformExists) {
      throw new AppError('Pc system already Exists!');
    }

    await redis.flushdb();

    const platform = await prisma.pcSystem.create({
      data: {
        game_id,
        minimal: {
          create: minimal,
        },
        recommended: {
          create: recommended,
        },
      },
    });

    return platform;
  }
}
