import 'dotenv/config';

import Stripe from 'stripe';

import { prisma } from 'database/prismaClient';

import { ICreatePaymentIntentDTO } from 'modules/orders/dtos/ICreatePaymentIntentDTO';

import { AppError } from 'shared/errors/AppError';

export class CreatePaymentIntentUseCase {
  async execute({ cart }: ICreatePaymentIntentDTO) {
    if (!process.env.STRIPE_KEY) {
      throw new AppError('Stripe key invalid!');
    }

    const stripe = new Stripe(process.env.STRIPE_KEY, {
      apiVersion: '2022-08-01',
    });

    const games = await prisma.game.findMany({
      where: {
        id: { in: cart },
      },
    });

    if (!games.length) {
      throw new AppError('No valid games found!');
    }

    const total_in_cents = Number(
      (games.reduce((acc, game) => acc + game.price, 0) * 100).toFixed(0),
    );

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total_in_cents,
        currency: 'BRL',
        metadata: { games: JSON.stringify(games.map(game => game.id)) },
      });

      return paymentIntent;
    } catch (err) {
      throw new AppError(err as string);
    }
  }
}
