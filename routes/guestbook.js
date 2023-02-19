const Helpers = require('../helpers');

async function handler(req, res) {
    res.send(await Helpers.ViewLoader.load('guestbook.pug', {
        current_route: req.originalUrl,
        ip: req.ip
    }));
    return;
}

module.exports = (router) => {
    router.get('/guestbook', handler);
}