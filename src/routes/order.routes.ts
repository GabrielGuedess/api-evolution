import { Router } from 'express';
import { ensureAuthenticated } from 'middlewares/ensureAuthenticated';

import { CreateOrderController } from 'modules/orders/useCases/createOrder/CreateOrderController';
import { CreatePaymentIntentController } from 'modules/orders/useCases/createPaymentIntent/CreatePaymentIntentController';

export const orderRouter = Router();

orderRouter.post('/', ensureAuthenticated, new CreateOrderController().handle);
orderRouter.post('/payment-intent', new CreatePaymentIntentController().handle);
