const express = require('express');
const router = express.Router();

const base = require('js-base64');

const cookie_parse = require('cookie-parser');
const cookie_encrypt = require('cookie-encrypter');

const APP_KEY = Buffer.from(process.env.APP_KEY, 'base64');

router.use(cookie_parse(APP_KEY));
router.use(cookie_encrypt(APP_KEY));

module.exports = router