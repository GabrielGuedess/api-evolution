import { hash } from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { resolve } from 'path';
import Stripe from 'stripe';

import { prisma } from 'database/prismaClient';

import { ICreateClientDTO } from 'modules/clients/dtos/ICreateClientDTO';

import { AppError } from 'shared/errors/AppError';

import upload from 'config/upload';

export class CreateClientUseCase {
  async execute({
    email,
    username,
    avatar,
    password,
    name,
    lastname,
    cpf,
    cellphone,
    date,
    cep,
    logradouro,
    numero,
    complemento,
    referencia,
    bairro,
    cidade,
    UF,
  }: ICreateClientDTO) {
    if (!process.env.STRIPE_KEY) {
      throw new AppError('Stripe key invalid!');
    }

    const stripe = new Stripe(process.env.STRIPE_KEY, {
      apiVersion: '2022-08-01',
    });

    const clientExistsEmail = await prisma.client.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    const clientExistsUsername = await prisma.client.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });

    if (clientExistsEmail || clientExistsUsername) {
      throw new AppError('Client already Exists!', 403);
    }

    const hashPassword = await hash(password, 10);

    let avatarImage;

    if (!!avatar) {
      const pathAvatar = resolve(upload.tmpFolder, avatar);

      avatarImage = await cloudinary.uploader
        .upload(pathAvatar, {
          folder: 'avatars',
          secure: true,
          public_id: username,
        })
        .catch(async err => {
          throw new AppError(err.message);
        })
        .finally(async () => {
          await fs.promises.unlink(pathAvatar);
        });
    }

    const customer = await stripe.customers.create({
      name: `${name} ${lastname}`,
      email: email,
      phone: cellphone,
      address: {
        line1: `${logradouro} ${numero}`,
        line2: `${complemento} ${referencia}`,
        city: cidade,
        state: UF,
      },
    });

    const client = await prisma.client.create({
      data: {
        email,
        username,
        avatar: avatarImage?.url ?? null,
        password: hashPassword,
        name,
        lastname,
        cpf,
        cellphone,
        date,
        cep,
        logradouro,
        numero,
        complemento,
        referencia,
        bairro,
        cidade,
        UF,
        id_customer: customer.id,
      },
    });

    return { client, customer };
  }
}
