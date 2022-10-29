import { Request, Response } from 'express';

import { AppError } from 'shared/errors/AppError';

import { CreateGalleryUseCase } from './CreateGalleryUseCase';

export class CreateGalleryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const image = req.file?.filename;
    const { alt, image_fit, width, height, type, games_id } = req.body;

    if (!image) {
      throw new AppError('Image error');
    }

    const createGalleryUseCase = new CreateGalleryUseCase();

    const result = await createGalleryUseCase.execute({
      image,
      alt,
      image_fit,
      width,
      height,
      type,
      games_id,
    });

    return res.status(201).json(result);
  }
}
