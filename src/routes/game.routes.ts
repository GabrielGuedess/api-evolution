import { Router } from 'express';
import { ensureAuthenticated } from 'middlewares/ensureAuthenticated';
import multer from 'multer';

import { CreateFavoriteGameController } from 'modules/games/useCases/createFavoriteGame/CreateFavoriteGameController';
import { CreateGameController } from 'modules/games/useCases/createGame/CreateGameController';
import { DeleteFavoriteGameController } from 'modules/games/useCases/deleteFavoriteGame/DeleteFavoriteGameController';
import { FindGamesController } from 'modules/games/useCases/findGames/FindGamesController';

import uploadConfig from 'config/upload';

const upload = multer(uploadConfig);

export const gameRouter = Router();

gameRouter.get('/', new FindGamesController().handle);

gameRouter.post(
  '/',
  upload.fields([
    { name: 'imageCard', maxCount: 1 },
    { name: 'background', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  new CreateGameController().handle,
);

gameRouter.post(
  '/favorite',
  ensureAuthenticated,
  new CreateFavoriteGameController().handle,
);

gameRouter.delete(
  '/favorite-delete/:id',
  ensureAuthenticated,
  new DeleteFavoriteGameController().handle,
);
