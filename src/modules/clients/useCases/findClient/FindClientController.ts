import { Request, Response } from 'express';

import { FindClientUseCase } from './FindClientUseCase';

export class FindClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;

    const findClientUseCase = new FindClientUseCase();

    const result = await findClientUseCase.execute({ client_id: user.id });

    return res.status(201).json(result);
  }
}
