import { prisma } from 'database/prismaClient';

import { ICreateDeveloperDTO } from 'modules/developers/dtos/ICreateDeveloperDTO';

import { AppError } from 'shared/errors/AppError';

export class CreateDeveloperUseCase {
  async execute({ name, slug }: ICreateDeveloperDTO) {
    const developerExists = await prisma.developer.findFirst({
      where: {
        slug,
      },
    });

    if (developerExists) {
      throw new AppError('Developer already Exists!');
    }

    const developer = await prisma.developer.create({
      data: {
        name,
        slug,
      },
    });

    return developer;
  }
}
