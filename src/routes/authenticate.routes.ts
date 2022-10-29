import { Router } from 'express';

import { AuthenticateClientController } from 'modules/account/useCases/auth/AuthenticateClientController';

export const authenticateRouter = Router();

authenticateRouter.post('/', new AuthenticateClientController().handle);
