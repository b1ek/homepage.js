const Helpers = require('../helpers');

async function handler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).send(Helpers.ViewLoader.load('error.pug', {
        error: '500 Internal Server Error',
        message: 'An unexpected error happened in the server'
    }));
}

module.exports = (router) => {
    // router.use(handler);
}