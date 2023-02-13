const Helpers = require('../helpers');

async function handler(req, res) {
    res.send(await Helpers.ViewLoader.load('welcome.eta'));
}

module.exports = (router) => {
    router.get('/', handler);
}