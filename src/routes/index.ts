import { Router } from 'express';

import { authenticateRouter } from './authenticate.routes';
import { clientRouter } from './client.routes';
import { developerRouter } from './developer.routes';
import { galleryRouter } from './gallery.routes';
import { gameRouter } from './game.routes';
import { genreRouter } from './genre.routes';
import { orderRouter } from './order.routes';
import { platformRouter } from './platform.routes';

export const router = Router();

router.use('/client', clientRouter);
router.use('/auth', authenticateRouter);
router.use('/order', orderRouter);
router.use('/game', gameRouter);
router.use('/genre', genreRouter);
router.use('/gallery', galleryRouter);
router.use('/developer', developerRouter);
router.use('/platform', platformRouter);
