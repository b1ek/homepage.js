const handler   = require('express-async-handler')
const Helpers   = require('../helpers');
const db        = require('../models');

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
    res.send(req.session);
    //res.redirect('/admin/panel');
    return;
}

module.exports = (router) => {
    router.get('/login', handler(login));
    router.get('/admin/login', handler(login));
    router.post('/admin/login', handler(apiLogin));
}