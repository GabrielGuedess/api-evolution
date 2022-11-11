import { prisma } from 'database/prismaClient';

import { redis } from 'cache';

import { ICreateFavoriteGameDTO } from 'modules/games/dtos/ICreateFavoriteGameDTO';
export class CreateFavoriteGameUseCase {
  async execute({ client_id, game_id }: ICreateFavoriteGameDTO) {
    await redis.flushdb();

    const gameCreated = await prisma.game_Favorite.upsert({
      where: {
        client_id,
      },
      create: {
        client_id,
        games: {
          connect: {
            id: game_id,
          },
        },
      },
      update: {
        games: {
          connect: {
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

    return gameCreated.games;
  }
}
