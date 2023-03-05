const express   = require('express');
const router    = new express.Router();
const Helpers   = require('../helpers');

router.use((err, req, res, next) => {
    if (res.template) return next();
    res.template = async (file, data) => {
        res.send(await Helpers.ViewLoader.load(file, {
            ...data,
            current_route: req.originalUrl,
            req,
            res,
            require
        }))
    }
});

module.exports = router;