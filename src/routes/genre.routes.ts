import { Router } from 'express';

import { CreateGenreController } from 'modules/genres/useCases/createGenre/CreateGenreController';

export const genreRouter = Router();

genreRouter.post('/', new CreateGenreController().handle);
