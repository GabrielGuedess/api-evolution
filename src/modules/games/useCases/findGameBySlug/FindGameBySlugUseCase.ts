import { prisma } from 'database/prismaClient';

import { IFindGameBySlug } from 'modules/games/dtos/IFindGameBySlugGameDTO';

export class FindGameBySlugUseCase {
  async execute({ slug }: IFindGameBySlug) {
    const game = await prisma.game.findFirst({
      where: {
        slug,
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
