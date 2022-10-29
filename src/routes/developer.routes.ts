import { Router } from 'express';

import { CreateDeveloperController } from 'modules/developers/useCases/createDeveloper/CreateDeveloperController';

export const developerRouter = Router();

developerRouter.post('/', new CreateDeveloperController().handle);
