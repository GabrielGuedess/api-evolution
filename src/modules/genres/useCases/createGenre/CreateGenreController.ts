import { Request, Response } from 'express';

import { CreateGenreUseCase } from './CreateGenreUseCase';

export class CreateGenreController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, slug } = req.body;

    const createGenreUseCase = new CreateGenreUseCase();

    const result = await createGenreUseCase.execute({
      name,
      slug,
    });

    return res.status(201).json(result);
  }
}
