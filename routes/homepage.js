const Sequelize = require('../models');
const handler = require('express-async-handler');

async function index(req, res) {

    let gb_entries = await Sequelize.Guestbook.findAll({
        limit: 5,
        order: [['id', 'DESC']],
        where: { hidden: false }
    });

    let articles = await Sequelize.Article.findAll({
        limit: 5
    });

    await res.template(
        'main.pug',
        {
            current_route: '/',
            gb_entries,
            articles,
            og: {
                title: 'blek! Site',
                type: 'website',
                image: req.protocol + '://' + req.get('host') + '/content/transylveonia.jpg',
                url: req.protocol + '://' + req.get('host') + req.originalUrl
            }
        }
    );
    return;
}

module.exports = (router) => {
    router.get('/', handler(index));
    router.get('/sources', (req, res) => {res.redirect('https://git.blek.codes/blek/homepage.js')});
}