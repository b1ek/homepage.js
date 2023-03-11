const handler   = require('express-async-handler');
const Helpers   = require('../helpers');
const db = require('../models');
const Sequelize = require('../models');

async function articles(req, res) {

    const articles = await Sequelize.Article.findAll();

    res.template('articles/articles.pug', {
        current_route: res.originalUrl,
        articles
    });
}

async function new_article(req, res) {
    res.template('admin/data_edit.pug', {
        current_route: req.originalUrl,
        data: {
            'title': {
                name: 'Title',
                type: 'text'
            },
            'body': {
                name: 'Contents',
                type: 'textarea'
            },
            'shortText': {
                name: 'Short description',
                type: 'textarea'
            },
            'gpgsign': {
                name: 'Body sign',
                type: 'codearea'
            },
            
        },
        description: 'Write a new article',
        title: 'New article',
        endpoint: '/articles/new',
        pref_method: 'POST'
    });
}

async function new_article_post(req, res) {

    // let data = await db.Article.

    res.send(req.body);
    return;
}

module.exports = (router) => {
    router.get('/articles', handler(articles));

    // editor
    router.get('/articles/new', handler(new_article));
    router.post('/articles/new', handler(new_article_post));
}