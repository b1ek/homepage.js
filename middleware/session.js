
const Redis = require("ioredis").Redis;
/** @type {import('ioredis').Redis} */
const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);

const express = require('express');
const router = express.Router();

async function session(req, res, next) {
    res.send(req.cookies);
    return;
}

router.use(session);

module.exports = router;