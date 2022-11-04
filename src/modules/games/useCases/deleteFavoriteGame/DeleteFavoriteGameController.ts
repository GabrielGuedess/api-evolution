import { Request, Response } from 'express';

import { DeleteFavoriteGameUseCase } from './DeleteFavoriteGameUseCase';

export class DeleteFavoriteGameController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;
    const { game_id } = req.body;

    const deleteFavoriteGameUseCase = new DeleteFavoriteGameUseCase();

    const result = await deleteFavoriteGameUseCase.execute({
      client_id: user.id,
      game_id,
    });

    return res.status(201).json(result);
  }
}
