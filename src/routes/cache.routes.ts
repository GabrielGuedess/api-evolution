import { Router } from 'express';

import { redis } from 'cache';

export const cacheRouter = Router();

cacheRouter.get('/clear-page/:page', async (req, res) => {
  const { page } = req.params;

  await redis.del(`games:page-${page}`);

  res.json({ message: 'Cache cleaned!' });
});
