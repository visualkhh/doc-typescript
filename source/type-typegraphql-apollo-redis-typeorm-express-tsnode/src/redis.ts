import Redis from "ioredis";

export const redis = new Redis({
    port: 6379,
    host: '119.206.205.177',
    db: process.env.NODE_ENV==='prod'? 5 : 4,
    password: 'omnifit!2#4'
});
