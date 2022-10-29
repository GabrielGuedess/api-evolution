import { Request, Response } from 'express';

import { CreateDeveloperUseCase } from './CreateDeveloperUseCase';

export class CreateDeveloperController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, slug } = req.body;

    const createDeveloperUseCase = new CreateDeveloperUseCase();

    const result = await createDeveloperUseCase.execute({
      name,
      slug,
    });

    return res.status(201).json(result);
  }
}
