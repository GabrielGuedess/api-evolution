import { prisma } from 'database/prismaClient';

import { redis } from 'cache';

import { IDeleteFavoriteGameDTO } from 'modules/games/dtos/IDeleteFavoriteGameDTO';

export class DeleteFavoriteGameUseCase {
  async execute({ client_id, game_id }: IDeleteFavoriteGameDTO) {
    await redis.flushdb();

    const gameDeleted = await prisma.game_Favorite.update({
      where: {
        client_id,
      },
      data: {
        games: {
          disconnect: {
            id: game_id,
          },
        },
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

    return gameDeleted.games;
  }
}
