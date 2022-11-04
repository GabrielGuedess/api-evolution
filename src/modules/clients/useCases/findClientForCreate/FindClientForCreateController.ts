import { Request, Response } from 'express';

import { FindClientForCreateUseCase } from './FindClientForCreateUseCase';

export class FindClientForCreateController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, username } = req.body;

    const findClientForCreateUseCase = new FindClientForCreateUseCase();

    const result = await findClientForCreateUseCase.execute({
      email,
      username,
    });

    return res.status(201).json(result);
  }
}
