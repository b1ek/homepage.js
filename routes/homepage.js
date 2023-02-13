const Helpers = require('../helpers');

async function handler(req, res) {
    res.send(await Helpers.ViewLoader.load('hi.pug'));
}

module.exports = (router) => {
    router.get('/', handler);
}