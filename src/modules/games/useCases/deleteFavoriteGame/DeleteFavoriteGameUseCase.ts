import { prisma } from 'database/prismaClient';

import { IDeleteFavoriteGameDTO } from 'modules/games/dtos/IDeleteFavoriteGameDTO';

import { AppError } from 'shared/errors/AppError';

export class DeleteFavoriteGameUseCase {
  async execute({ id, client_id }: IDeleteFavoriteGameDTO) {
    const gameExists = await prisma.game_Favorite.findFirst({
      where: {
        id,
        client_id,
      },
    });

    if (!gameExists) {
      throw new AppError('Game is not on wishlist!');
    }

    const game = await prisma.game_Favorite.delete({
      where: {
        id,
      },
    });

    return game;
  }
}
