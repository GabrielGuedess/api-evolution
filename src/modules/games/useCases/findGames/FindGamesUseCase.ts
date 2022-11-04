import { prisma } from 'database/prismaClient';

import { redis } from 'cache';

import { IFindGamesDTO } from 'modules/games/dtos/IFindGamesDTO';

export class FindGamesUseCase {
  async execute({ page }: IFindGamesDTO) {
    const cacheKey = `games:page-${page}`;

    const cacheGames = await redis.get(cacheKey);

    if (cacheGames) {
      return JSON.parse(cacheGames);
    }

    const games = await prisma.game.findMany({
      skip: !!page ? +page - 1 : 0,
      take: !!page ? +page * 12 : undefined,
      include: {
        genres: true,
        developers: true,
        platforms: true,
        games_gallery: true,
        games_favorites: true,
        pc_system: {
          select: {
            minimal: true,
            recommended: true,
          },
        },
      },
    });

    await redis.set(cacheKey, JSON.stringify(games));

    return games;
  }
}
