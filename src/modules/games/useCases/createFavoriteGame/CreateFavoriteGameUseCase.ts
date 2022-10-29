import { prisma } from 'database/prismaClient';

import { ICreateFavoriteGameDTO } from 'modules/games/dtos/ICreateFavoriteGameDTO';

import { AppError } from 'shared/errors/AppError';

export class CreateFavoriteGameUseCase {
  async execute({ client_id, game_id }: ICreateFavoriteGameDTO) {
    const gameExists = await prisma.game_Favorite.findFirst({
      where: {
        game_id: game_id,
      },
    });

    if (gameExists) {
      throw new AppError('Game already on wishlist!');
    }

    const game = await prisma.game_Favorite.create({
      data: {
        client_id,
        game_id,
      },
    });

    return game;
  }
}
