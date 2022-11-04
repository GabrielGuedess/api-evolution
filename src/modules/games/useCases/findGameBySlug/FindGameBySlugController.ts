import { Request, Response } from 'express';

import { FindGameBySlugUseCase } from './FindGameBySlugUseCase';

export class FindGameBySlugController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { slug } = req.params;

    const findGameBySlugUseCase = new FindGameBySlugUseCase();

    const result = await findGameBySlugUseCase.execute({ slug });

    return res.status(201).json(result);
  }
}
