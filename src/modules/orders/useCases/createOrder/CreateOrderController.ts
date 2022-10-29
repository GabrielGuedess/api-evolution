import { Request, Response } from 'express';

import { CreateOrderUseCase } from './CreateOrderUseCase';

export class CreateOrderController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;

    const { cart, paymentIntentId, paymentMethod } = req.body;

    const createOrderUseCase = new CreateOrderUseCase();

    const result = await createOrderUseCase.execute({
      client_id: user.id,
      cart,
      paymentIntentId,
      paymentMethod,
    });

    return res.status(201).json(result);
  }
}
