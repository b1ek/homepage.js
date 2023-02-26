const express = require('express');
const router = express.Router();
const glob = require('glob');

router.use(require('./cookie'));
router.use(require('./session'));
router.use(require('./session_back'));

module.exports = router;