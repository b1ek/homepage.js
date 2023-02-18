const Helpers = require('../helpers');

async function handler(req, res) {
    res.send(
        await Helpers.ViewLoader.load(
            'main.pug',
            {
                current_route: '/'
            }
        )
    );
    return;
}

module.exports = (router) => {
    router.get('/', handler);
}