const express = require('express');
const router = express.Router();

async function handler(req, res, next) {
    // TODO:
    // Log only non-automatical requests
    // In other words, ignore requests like favicon.ico
    if (!req.accepts('html') && !req.accepts('*')) {
        next();
        return;
    }
    req.session.prev = req.originalUrl;
    req.session.save();
    next();
}

router.use(handler);

module.exports = router