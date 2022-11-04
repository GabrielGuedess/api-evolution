import { prisma } from 'database/prismaClient';

import { IFindClientDTO } from 'modules/clients/dtos/IFindClientDTO';

import { AppError } from 'shared/errors/AppError';

export class FindClientUseCase {
  async execute({ client_id }: IFindClientDTO) {
    const client = prisma.client.findFirst({
      where: {
        id: client_id,
      },
      include: {
        order: true,
        games_favorites: true,
      },
    });

    if (!client) {
      throw new AppError('Client does not Exists!');
    }

    return client;
  }
}
