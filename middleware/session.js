
const express   = require('express');
const session   = require('express-session');
const crypto    = require('crypto');
const router    = new express.Router();
const parser    = require('cookie-parser');

const Redis = require("ioredis").Redis;
/** @type {import('ioredis').Redis} */
const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);
const ConnectRedis = require('connect-redis')(session);
const store = new ConnectRedis({client: redis});

router.use(parser())
router.use(session({
    secret: process.env.APP_KEY,
    store: store,
    cookie: {
        // secure cookies didnt work for some reason
        secure: false
    },
    resave: true,
    genid: (req) => {
        return crypto.randomBytes(256).toString('base64');
    }
}));

module.exports = router;