import Redis from "ioredis";

export const redis = new Redis({
    port: 6379,
    host: '1.1.1.1',
    db: process.env.NODE_ENV==='prod'? 5 : 4,
    password: '11111'
});
