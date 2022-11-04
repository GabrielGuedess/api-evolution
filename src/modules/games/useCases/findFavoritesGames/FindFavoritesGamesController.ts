import { Request, Response } from 'express';

import { FindFavoritesGamesUseCase } from './FindFavoritesGamesUseCase';

export class FindFavoritesGamesController {
  async handle(req: Request, res: Response): Promise<Response> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { page } = req.query as any;
    const { user } = req;

    const findFavoritesGamesUseCase = new FindFavoritesGamesUseCase();

    const result = await findFavoritesGamesUseCase.execute({
      page,
      client_id: user.id,
    });

    return res.status(201).json(result);
  }
}
