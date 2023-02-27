const Helpers = require('../helpers');
const Sequelize = require('../models');

async function handler(req, res) {

    let gb_entries = await Sequelize.Guestbook.findAll({
        limit: 5,
        order: [['id', 'DESC']],
        where: { hidden: false }
    });

    let articles = await Sequelize.Article.findAll({
        limit: 5
    });

    res.send(
        await Helpers.ViewLoader.load(
            'main.pug',
            {
                current_route: '/',
                gb_entries,
                articles
            }
        )
    );
    return;
}

module.exports = (router) => {
    router.get('/', handler);
}