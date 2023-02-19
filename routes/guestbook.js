const Helpers = require('../helpers');

async function handler(req, res) {
    res.send(await Helpers.ViewLoader.load('guestbook.pug', {
        current_route: req.originalUrl,
        ip: req.ip
    }));
    return;
}

async function submit(req, res) {
    res.send(req.body);
    return;
}

module.exports = (router) => {
    router.get('/guestbook', handler);
    router.post('/guestbook/submit', submit);
}