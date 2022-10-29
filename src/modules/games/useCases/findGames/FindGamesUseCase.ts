import { prisma } from 'database/prismaClient';

import { redis } from 'cache';

import { IFindGamesDTO } from 'modules/games/dtos/IFindGamesDTO';

export class FindGamesUseCase {
  async execute({ page }: IFindGamesDTO) {
    const cacheKey = `games:page-${page}`;

    const cacheGames = await redis.get(cacheKey);

    console.time('Find Games');

    if (cacheGames) {
      console.timeEnd('Find Games');
      console.log('Cache');
      return JSON.parse(cacheGames);
    }

    const games = await prisma.game.findMany({
      skip: +page - 1,
      take: +page * 12,
      include: {
        genres: true,
        developers: true,
        platforms: true,
        games_gallery: true,
        games_favorites: true,
        order: true,
      },
    });

    await redis.set(cacheKey, JSON.stringify(games));

    console.log('No cache');
    console.timeEnd('Find Games');

    return games;
  }
}
