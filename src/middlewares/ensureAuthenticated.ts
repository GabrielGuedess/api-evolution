import auth from 'config/auth';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from 'shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 403);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: client_id } = verify(token, auth.secret_token) as IPayload;

    req.user = {
      id: client_id,
    };

    next();
  } catch {
    throw new Error('Invalid token!');
  }
}
