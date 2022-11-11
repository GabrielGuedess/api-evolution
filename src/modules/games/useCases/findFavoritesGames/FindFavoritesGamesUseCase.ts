import { prisma } from 'database/prismaClient';

import { redis } from 'cache';

import { IFindFavoritesGamesDTO } from 'modules/games/dtos/IFindFavoritesGamesDTO';

export class FindFavoritesGamesUseCase {
  async execute({ page, client_id }: IFindFavoritesGamesDTO) {
    const cacheKey = `games-favorites:user-${client_id}:page-${page}`;

    const cacheGames = await redis.get(cacheKey);

    if (cacheGames) {
      return JSON.parse(cacheGames);
    }

    const games = await prisma.game_Favorite.findMany({
      skip: !!page ? +page - 1 : 0,
      take: !!page ? +page * 12 : undefined,
      where: {
        client_id,
      },
      select: {
        games: {
          select: {
            id: true,
            name: true,
            slug: true,
            release_date: true,
            genres: true,
            developers: true,
            image: true,
            score: true,
            price: true,
            platforms: true,
            primary_color: true,
          },
        },
      },
    });

    const onlyGames = games.map(item => item.games);

    await redis.set(cacheKey, JSON.stringify(onlyGames[0]));

    return onlyGames[0];
  }
}
