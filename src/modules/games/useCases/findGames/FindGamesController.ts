import { Request, Response } from 'express';

import { FindGamesUseCase } from './FindGamesUseCase';

export class FindGamesController {
  async handle(req: Request, res: Response): Promise<Response> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { page } = req.query as any;

    const findGamesUseCase = new FindGamesUseCase();

    const result = await findGamesUseCase.execute({
      page,
    });

    return res.status(201).json(result);
  }
}
