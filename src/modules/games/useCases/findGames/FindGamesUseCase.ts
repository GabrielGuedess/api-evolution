import { prisma } from 'database/prismaClient';

import { IFindGamesDTO } from 'modules/games/dtos/IFindGamesDTO';

export class FindGamesUseCase {
  async execute({ page }: IFindGamesDTO) {
    const games = await prisma.game.findMany({
      skip: +page - 1,
      take: +page * 12,
    });

    return games;
  }
}
