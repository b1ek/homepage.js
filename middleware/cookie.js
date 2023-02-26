const express = require('express');
const router = express.Router();

const cookie_parse = require('cookie-parser');
const cookie_encrypt = require('cookie-encrypter');

const { APP_KEY } = process.env;

router.use(cookie_parse(APP_KEY))
router.use(cookie_encrypt(APP_KEY));

module.exports = router