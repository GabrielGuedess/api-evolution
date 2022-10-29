import { Request, Response } from 'express';

import { CreateFavoriteGameUseCase } from './CreateFavoriteGameUseCase';

export class CreateFavoriteGameController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;
    const { game_id } = req.body;

    const createFavoriteGameUseCase = new CreateFavoriteGameUseCase();

    const result = await createFavoriteGameUseCase.execute({
      client_id: user.id,
      game_id,
    });

    return res.status(201).json(result);
  }
}
