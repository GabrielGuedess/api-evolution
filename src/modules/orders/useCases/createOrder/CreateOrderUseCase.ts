import 'dotenv/config';

import Stripe from 'stripe';

import { prisma } from 'database/prismaClient';

import { AppError } from 'shared/errors/AppError';

import { ICreateOrderDTO } from '../../dtos/ICreateOrderDTO';

export class CreateOrderUseCase {
  async execute({
    client_id,
    cart,
    paymentIntentId,
    paymentMethod,
  }: ICreateOrderDTO) {
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

    const total_in_cents = Number(
      (games.reduce((acc, game) => acc + game.price, 0) * 100).toFixed(0),
    );

    let paymentInfo;

    try {
      paymentInfo = await stripe.paymentMethods.retrieve(paymentMethod?.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new AppError(err.message as string);
    }

    if (!paymentInfo.card) {
      throw new AppError('Card invalid!');
    }

    const order = await prisma.order.create({
      data: {
        total_in_cents,
        client_id,
        payment_intent_id: paymentIntentId,
        card_brand: paymentInfo.card.brand,
        card_last4: paymentInfo.card.last4,
      },
    });

    return order;
  }
}
