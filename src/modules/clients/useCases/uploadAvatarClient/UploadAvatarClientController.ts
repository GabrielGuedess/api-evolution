import { Request, Response } from 'express';

import { UploadAvatarClientUseCase } from './UploadAvatarClientUseCase';

export class UploadAvatarClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;
    let avatar;

    if (!!req.file) {
      avatar = req.file.filename;
    }

    const uploadAvatarClientUseCase = new UploadAvatarClientUseCase();

    const result = await uploadAvatarClientUseCase.execute({
      client_id: user.id,
      avatar: !!avatar ? avatar : null,
    });

    return res.status(201).json(result);
  }
}
