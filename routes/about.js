const Helpers = require('../helpers');
const handler = require('express-async-handler');

async function about(req, res) {
    res.send(await Helpers.ViewLoader.load('about.pug', {
        current_route: req.originalUrl
    }));
}

module.exports = (router) => {
    router.get('/about', handler(about));
}