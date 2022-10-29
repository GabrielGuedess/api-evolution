import { prisma } from 'database/prismaClient';

import { ICreateGenreDTO } from 'modules/genres/dtos/ICreateGenreDTO';

import { AppError } from 'shared/errors/AppError';

export class CreateGenreUseCase {
  async execute({ name, slug }: ICreateGenreDTO) {
    const genreExists = await prisma.genre.findFirst({
      where: {
        slug,
      },
    });

    if (genreExists) {
      throw new AppError('Genre already Exists!');
    }

    const genre = await prisma.genre.create({
      data: {
        name,
        slug,
      },
    });

    return genre;
  }
}
