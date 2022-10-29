import { Request, Response } from 'express';

import { DeleteFavoriteGameUseCase } from './DeleteFavoriteGameUseCase';

export class DeleteFavoriteGameController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;
    const { id } = req.params;

    const deleteFavoriteGameUseCase = new DeleteFavoriteGameUseCase();

    const result = await deleteFavoriteGameUseCase.execute({
      id,
      client_id: user.id,
    });

    return res.status(201).json(result);
  }
}
