import { Request, Response } from 'express';

import { CreatePlatformUseCase } from './CreatePlatformUseCase';

export class CreatePlatformController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, slug } = req.body;

    const createPlatformUseCase = new CreatePlatformUseCase();

    const result = await createPlatformUseCase.execute({
      name,
      slug,
    });

    return res.status(201).json(result);
  }
}
