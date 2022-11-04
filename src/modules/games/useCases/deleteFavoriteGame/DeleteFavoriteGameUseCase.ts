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
          include: {
            genres: true,
            developers: true,
            platforms: true,
          },
        },
      },
    });

    return gameDeleted.games;
  }
}
