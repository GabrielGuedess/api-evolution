import { Router } from 'express';
import multer from 'multer';

import { CreateGalleryController } from 'modules/gallery/useCases/createGallery/CreateGalleryController';

import uploadConfig from 'config/upload';

export const galleryRouter = Router();

const upload = multer(uploadConfig);

galleryRouter.post(
  '/',
  upload.single('image'),
  new CreateGalleryController().handle,
);
