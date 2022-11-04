import { prisma } from 'database/prismaClient';

import { IFindGameById } from 'modules/games/dtos/IFindGameByIdDTO';

export class FindGameByIdUseCase {
  async execute({ id }: IFindGameById) {
    const game = await prisma.game.findUnique({
      where: {
        id,
      },
      include: {
        genres: true,
        developers: true,
        platforms: true,
        games_gallery: true,
        games_favorites: true,
        order: true,
        pc_system: {
          select: {
            minimal: true,
            recommended: true,
          },
        },
      },
    });

    return game;
  }
}
