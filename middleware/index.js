const express = require('express');
const router = express.Router();

const minify = require('express-minify');
const browser = require('express-browser-detect');

// custom
router.use(require('./template'));
router.use(require('./cookie'));
router.use(require('./session'));
router.use(require('./session_back'));

// libs
router.use(minify({
    cache: process.env.APP_DEBUG == true,
    uglifyJS: null,
    errorHandler: console.error,
    css_match: /.css^/,
    js_match: /.js^/
}));
router.use(browser);

module.exports = router;