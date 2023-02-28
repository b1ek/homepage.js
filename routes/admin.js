const handler   = require('express-async-handler')
const Helpers   = require('../helpers');
const db        = require('../models');
const express   = require('express');

async function login(req, res) {
    res.send(await Helpers.ViewLoader.load('admin/login.pug', {
        current_route: req.originalUrl
    }));
}

async function apiLogin(req, res) {

    if (req.session.user) {
        res.send('Already logged in');
        return;
    }

    const user = (await db.User.authenticate(req.body));

    if (!user) {
        res.status(401).send('Bad auth');
    }
    const session = await user.createSession();
    req.session.user = session;
    res.redirect('/admin/panel');
    return;
}

async function panel(req, res) {

    const user = await db.User.bySession(req.session);
    if (!user) {
        res.status(401).send('Forbidden');
        return;
    }

    const gb_records = await db.Guestbook.findAll({
        order: [['id', 'DESC']]
    });

    const articles = await db.Article.findAll({where: {hidden: true}});

    res.send(await Helpers.ViewLoader.load('admin/panel.pug', {
        current_route: req.originalUrl,
        gb_records,
        access_level: user.accessLevel
    }));
    return;
}

async function gb_api(req, res) {
    let action = false;
    const id = req.body.id;
    const user = await db.User.bySession(req.session);
    if (!user) {
        res.status(401).send('Forbidden');
        return;
    }

    if (req.body.hide) action = 'hide';

    if (!action) {
        res.redirect('/admin/panel');
        return;
    }
    
    switch (action) {
        case 'hide':
            const response = await db.Guestbook.update({hidden: db.Sequelize.literal('NOT hidden')}, {where: {id}})
            res.redirect('/admin/panel');
            return;
    }
}

async function article_new(req, res) {
    res.send(await Helpers.ViewLoader.load('articles/new.pug'))
}

module.exports = (router) => {

    // login
    router.get('/login', handler(login));
    router.get('/admin/login', handler(login));
    router.post('/admin/login', handler(apiLogin));

    router.post('/gb_api', handler(gb_api));

    
    // panel
    router.get('/admin/panel', handler(panel));

    // article
    router.get('/admin/article/new', handler(article_new));
}