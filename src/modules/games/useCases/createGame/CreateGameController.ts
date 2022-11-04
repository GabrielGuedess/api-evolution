import { Request, Response } from 'express';

import { AppError } from 'shared/errors/AppError';

import { CreateGameUseCase } from './CreateGameUseCase';

export class CreateGameController {
  async handle(req: Request, res: Response): Promise<Response> {
    const files = req.files as {
      [key: string]: Express.Multer.File[];
    };

    if (!files['imageCard'][0]) {
      throw new AppError('Image Card error!');
    }

    if (!files['background'][0]) {
      throw new AppError('Background error!');
    }

    if (!files['video']) {
      console.log('Video Empty');
    }

    const {
      name,
      slug,
      release_date,
      score,
      description,
      price,
      genres,
      developers,
      platforms,
    } = req.body;

    let video = null;

    if (files['video']) {
      video = files['video'][0].path;
    }

    const createGameUseCase = new CreateGameUseCase();

    const result = await createGameUseCase.execute({
      name,
      slug,
      release_date,
      score,
      video: video,
      image: files['imageCard'][0].path,
      background: files['background'][0].path,
      description,
      price,
      genres,
      developers,
      platforms,
    });

    return res.status(201).json(result);
  }
}
