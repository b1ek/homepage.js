const Helpers = require('../helpers');
const Sequelize = require('../models');
const html_escape = require('html-escaper');

const send_error = async (req, res, error, data) => {
    res.send(await Helpers.ViewLoader.load('guestbook.pug', {
        current_route: req.originalUrl,
        ip: req.ip,
        errors: error,
        data
    }));
};

async function handler(req, res, next) {
    try {

        const errors = req.query.error;

        const data = await Sequelize.Guestbook.findAll({
            where: {
                hidden: false
            },
            order: [
                ['id', 'DESC']
            ]
        });
        if (!data) throw new Error('Failed to get guestbook entries');


        res.send(await Helpers.ViewLoader.load('guestbook.pug', {
            current_route: req.originalUrl,
            ip: req.ip,
            data,
            errors
        }));
        return;
    } catch (err) {
        next(err);
    }
}

async function submit(req, res, next) {
    const { name, email, message } = req.body; 
    const hidemail = req.body.hidemail ? (req.body.hidemail == 'on' ? true : false) : false;

    if (message.length >= 512) {
        res.redirect('/guestbook?error=' + encodeURIComponent('Maximum length is 512 characters.'));
        return;
    }

    let data = await Sequelize.Guestbook.create({
        name,
        email,
        text: message,
        hidemail,
        ip: req.ip,
        hidden: false,
        time: Math.floor(Date.now() / 1000)
    });
    if (!data) {
        res.send(await Helpers.ViewLoader.load('guestbook.pug', {
            current_route: req.originalUrl,
            ip: req.ip,
            errors: 'Could not create a new record'
        }));
    }
    
    res.redirect('/guestbook#gb_entry_' + data.id);

    return;
}

async function del(req, res, next) {
    try
    {
        let record = await Sequelize.Guestbook.findAndCountAll({
            where: {id: req.params.id}
        });
        if (record.count == 0) {
            res.redirect('/guestbook');
        }
        const data = record.rows[0];
        if (
            data.ip == req.ip &&
            Math.floor(Date.now() / 1000) - data.time <= (60 * 60 * 24)
        ) {
            await Sequelize.Guestbook.update({hidden: true}, {where: {id: req.params.id}})
            res.redirect('/guestbook');
        } else {
            res.redirect('/guestbook?error=' + encodeURIComponent('You don\'t have permission to delete this record.'))
            return
        }
    }
    catch (err) { next(err); }
}

module.exports = (router) => {
    router.get('/guestbook', handler);
    router.post('/guestbook/submit', submit);
    router.get('/guestbook/del/:id', del);
}