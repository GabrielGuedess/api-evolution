import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { prisma } from 'database/prismaClient';

import { IAuthenticateClientDTO } from 'modules/account/dtos/IAuthenticateClientDTO';

import { AppError } from 'shared/errors/AppError';

export class AuthenticateClientUseCase {
  async execute({ email, password }: IAuthenticateClientDTO) {
    const client = await prisma.client.findFirst({
      where: {
        email,
      },
    });

    if (!client) {
      throw new AppError('E-mail or password invalid');
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new AppError('E-mail or password invalid');
    }

    const token = sign({ email }, '23429ccdac6bcc82ef1d5af20b008fff', {
      subject: client.id,
      expiresIn: '1d',
    });

    return token;
  }
}
