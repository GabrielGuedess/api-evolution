import { Request, Response } from 'express';

import { FindOrdersMeUseCase } from './FindOrdersMeUseCase';

export class FindOrdersMeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;

    const findOrdersMeUseCase = new FindOrdersMeUseCase();

    const result = await findOrdersMeUseCase.execute({ client_id: user.id });

    return res.status(201).json(result);
  }
}
