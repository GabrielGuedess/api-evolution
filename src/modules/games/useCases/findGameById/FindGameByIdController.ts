import { Request, Response } from 'express';

import { FindGameByIdUseCase } from './FindGameByIdUseCase';

export class FindGameByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findGameByIdUseCase = new FindGameByIdUseCase();

    const result = await findGameByIdUseCase.execute({ id });

    return res.status(201).json(result);
  }
}
