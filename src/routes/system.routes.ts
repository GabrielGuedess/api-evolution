import { Router } from 'express';

import { CreatePcSystemController } from 'modules/system/useCases/createPcSystem/CreatePcSystemController';

export const pcSystemRouter = Router();

pcSystemRouter.post('/', new CreatePcSystemController().handle);
