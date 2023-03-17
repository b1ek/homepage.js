const express = require('express');
const router = express.Router();

const minify = require('express-minify');

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

// TODO: Maybe move all regexes into one file? Idk
const legacy_re = /(Firefox\/[0-5]\d{0,1}|Mozilla\/[0-4]|MSIE \d{1,2}\.\d{1,2}|Windows (NT|9\d)|Linux i686|(198\d|199\d|200\d|201[0-6])|Opera|Dillo|Naenara|Navscape|Lynx[1-5]|QtWeb|Prism|Tencent|i(Phone|Pad|Pod)( OS [1-6]|))/g;

router.use((req, res, next) => {
    req.legacymode = req.headers['user-agent'].match(legacy_re);
    next();
});

module.exports = router;