import { prisma } from 'database/prismaClient';

import { IFindClientForCreateDTO } from 'modules/clients/dtos/IFindClientForCreateDTO';

import { AppError } from 'shared/errors/AppError';

export class FindClientForCreateUseCase {
  async execute({ email, username }: IFindClientForCreateDTO) {
    const clientEmail = await prisma.client.findFirst({
      where: {
        email,
      },
    });

    const clientUser = await prisma.client.findFirst({
      where: {
        username,
      },
    });

    if (clientEmail && clientUser) {
      throw new AppError('Client already Exists!');
    }

    if (clientEmail && !clientUser) {
      throw new AppError('Email already Exists!');
    }

    if (clientUser && !clientEmail) {
      throw new AppError('Username already Exists!');
    }

    return {
      ok: true,
    };
  }
}
