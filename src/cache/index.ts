import IORedis from 'ioredis';

export const redis = new IORedis({
  host: `${process.env.REDIS_HOST}`,
  port: Number(process.env.REDIS_PORT),
  password: `${process.env.REDIS_PASSWORD}`,
});
