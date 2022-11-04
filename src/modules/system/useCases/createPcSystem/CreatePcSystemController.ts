import { Request, Response } from 'express';

import { CreatePcSystemUseCase } from './CreatePcSystemUseCase';

export class CreatePcSystemController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { game_id, minimal, recommended } = req.body;

    const createPcSystemUseCase = new CreatePcSystemUseCase();

    const result = await createPcSystemUseCase.execute({
      game_id,
      minimal,
      recommended,
    });

    return res.status(201).json(result);
  }
}
