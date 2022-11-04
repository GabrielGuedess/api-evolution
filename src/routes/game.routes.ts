import { Router } from 'express';
import { ensureAuthenticated } from 'middlewares/ensureAuthenticated';
import multer from 'multer';

import { CreateFavoriteGameController } from 'modules/games/useCases/createFavoriteGame/CreateFavoriteGameController';
import { CreateGameController } from 'modules/games/useCases/createGame/CreateGameController';
import { DeleteFavoriteGameController } from 'modules/games/useCases/deleteFavoriteGame/DeleteFavoriteGameController';
import { FindFavoritesGamesController } from 'modules/games/useCases/findFavoritesGames/FindFavoritesGamesController';
import { FindGameByIdController } from 'modules/games/useCases/findGameById/FindGameByIdController';
import { FindGameBySlugController } from 'modules/games/useCases/findGameBySlug/FindGameBySlugController';
import { FindGamesController } from 'modules/games/useCases/findGames/FindGamesController';

import uploadConfig from 'config/upload';

const upload = multer(uploadConfig);

export const gameRouter = Router();

gameRouter.get('/', new FindGamesController().handle);

gameRouter.get('/id/:id', new FindGameByIdController().handle);
gameRouter.get('/slug/:slug', new FindGameBySlugController().handle);

gameRouter.post(
  '/',
  upload.fields([
    { name: 'imageCard', maxCount: 1 },
    { name: 'background', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  new CreateGameController().handle,
);

gameRouter.get(
  '/favorite',
  ensureAuthenticated,
  new FindFavoritesGamesController().handle,
);

gameRouter.post(
  '/favorite',
  ensureAuthenticated,
  new CreateFavoriteGameController().handle,
);

gameRouter.put(
  '/favorite',
  ensureAuthenticated,
  new DeleteFavoriteGameController().handle,
);
