const handler   = require('express-async-handler');
const Helpers   = require('../helpers');
const Sequelize = require('../models');

async function articles(req, res) {

    const articles = await Sequelize.Article.findAll();

    res.send(await Helpers.ViewLoader.load('articles/articles.pug', {
        current_route: res.originalUrl,
        articles
    }));
}

module.exports = (router) => {
    router.get('/articles', handler(articles));
}