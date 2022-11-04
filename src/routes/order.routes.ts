import { Router } from 'express';
import { ensureAuthenticated } from 'middlewares/ensureAuthenticated';

import { CreateOrderController } from 'modules/orders/useCases/createOrder/CreateOrderController';
import { CreatePaymentIntentController } from 'modules/orders/useCases/createPaymentIntent/CreatePaymentIntentController';
import { FindOrdersMeController } from 'modules/orders/useCases/findOrdersMe/FindOrdersMeController';

export const orderRouter = Router();

orderRouter.get('/', ensureAuthenticated, new FindOrdersMeController().handle);

orderRouter.post('/', ensureAuthenticated, new CreateOrderController().handle);

orderRouter.post(
  '/payment-intent',
  ensureAuthenticated,
  new CreatePaymentIntentController().handle,
);
