import { Router } from 'express';
import { ensureAuthenticated } from 'middlewares/ensureAuthenticated';
import multer from 'multer';

import { CreateClientController } from 'modules/clients/useCases/createClient/CreateClientController';
import { FindClientController } from 'modules/clients/useCases/findClient/FindClientController';
import { FindClientForCreateController } from 'modules/clients/useCases/findClientForCreate/FindClientForCreateController';
import { UploadAvatarClientController } from 'modules/clients/useCases/uploadAvatarClient/UploadAvatarClientController';

import uploadConfig from 'config/upload';

export const clientRouter = Router();

const upload = multer(uploadConfig);

clientRouter.get('/me', ensureAuthenticated, new FindClientController().handle);

clientRouter.post('/exist', new FindClientForCreateController().handle);

clientRouter.post(
  '/',
  upload.single('avatar'),
  new CreateClientController().handle,
);

clientRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  new UploadAvatarClientController().handle,
);
