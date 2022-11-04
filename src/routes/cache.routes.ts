import { Router } from 'express';

import { redis } from 'cache';

export const cacheRouter = Router();

cacheRouter.get('/clear', async (req, res) => {
  await redis.flushdb();

  res.json({ message: 'Cache cleaned!' });
});
