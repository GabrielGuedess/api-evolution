import { Router } from 'express';

import { CreatePlatformController } from 'modules/platforms/useCases/createPlatform/CreatePlatformController';

export const platformRouter = Router();

platformRouter.post('/', new CreatePlatformController().handle);
