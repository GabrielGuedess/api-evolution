import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { prisma } from 'database/prismaClient';

import { redis } from 'cache';

import { IAuthenticateClientDTO } from 'modules/account/dtos/IAuthenticateClientDTO';

import { AppError } from 'shared/errors/AppError';

export class AuthenticateClientUseCase {
  async execute({ email, password }: IAuthenticateClientDTO) {
    const client = await prisma.client.findUnique({
      where: {
        email,
      },
    });

    if (!client) {
      throw new AppError('E-mail or password invalid');
    }

    await redis.flushdb();

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new AppError('E-mail or password invalid');
    }

    const token = sign({ email }, '23429ccdac6bcc82ef1d5af20b008fff', {
      subject: client.id,
      expiresIn: '7d',
    });

    return {
      jwt: token,
      user: {
        name: client.name,
        lastname: client.lastname,
        photo: client.avatar,
        username: client.username,
        email: client.email,
      },
    };
  }
}
