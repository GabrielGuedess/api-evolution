import { Request, Response } from 'express';

import { CreatePaymentIntentUseCase } from './CreatePaymentIntentUseCase';

export class CreatePaymentIntentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { cart } = req.body;

    const createPaymentIntentUseCase = new CreatePaymentIntentUseCase();

    const result = await createPaymentIntentUseCase.execute({ cart });

    return res.status(201).json(result);
  }
}
