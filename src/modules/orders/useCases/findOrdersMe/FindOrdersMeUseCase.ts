import { prisma } from 'database/prismaClient';

import { IFindOrdersMeDTO } from 'modules/orders/dtos/IFindOrdersMeDTO';

import { AppError } from 'shared/errors/AppError';

export class FindOrdersMeUseCase {
  async execute({ client_id }: IFindOrdersMeDTO) {
    const order = prisma.order.findMany({
      where: {
        client_id,
      },
      select: {
        total_in_cents: true,
        card_brand: true,
        card_last4: true,
        created_at: true,
        games: {
          include: {
            genres: true,
            developers: true,
            platforms: true,
          },
        },
      },
    });

    if (!order) {
      throw new AppError('Order does not Found!');
    }

    return order;
  }
}
