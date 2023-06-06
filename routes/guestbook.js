const Sequelize = require('../models');
const xml = require('xml');
const handler = require('express-async-handler');
const Helpers = require('../helpers');
const crypto = require('crypto');

const send_error = async (req, res, error) => {
    const code = crypto.randomBytes(2).toString('hex');
    req.session.gb_error = {
        text: error,
        code
    }
    return res.redirect('/guestbook?error=' + code);
};

async function guestbook(req, res, next) {
    try {

        if (!req.query.error) {
            delete req.session.gb_error;
        }
        if (req.query.error && req.session.gb_error === undefined) {
            return res.redirect('/guestbook');
        }

        const errors =
            req.query.error && req.session.gb_error ? 
                req.session.gb_error.code == req.query.error ?
                    req.session.gb_error.text :
                    null
                : false;

        const data = await Sequelize.Guestbook.findAll({
            where: {
                hidden: false
            },
            order: [
                ['id', 'DESC']
            ]
        });
        if (!data) throw new Error('Failed to get guestbook entries');

        res.template('guestbook.pug', {
            current_route: req.originalUrl,
            ip: req.ip,
            data,
            errors,
            name: req.session.gb_name,
            email: req.session.gb_email,
            hidemail: req.session.gb_hidemail
        });
        return;
    } catch (err) {
        next(err);
    }
}

async function submit(req, res, next) {
    const { name, email, message } = req.body; 
    const hidemail = req.body.hidemail ? (req.body.hidemail == 'on' ? true : false) : false;

    // check for errors
    let errors = [];
    if (message.length >= 512) {
        errors.push('Maximum length is 512 characters.');
    }
    if (name.match(/^(\s|\u00A0|[\u2000-\u2009]|\u200A|\u2028|\u205F|\u3000)*$/g)) {
        errors.push('Name must be specified.');
    }
    if (
        !email
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        &&
        email !== ''
    ) {
        errors.push('Email is of invalid format.');
    }
    if (message == '') {
        errors.push('Message should not be empty!');
    }

    if (process.env.DISALLOW_TOR.split(',').indexOf('guestbook') !== -1) {
        let ip4 = req.ip.startsWith('::ffff:') ? req.ip.replace(/^::ffff:/, '') : req.ip;
        if (await Helpers.TorChecker.check(ip4)) {
            errors.push('Using tor is not allowed: IP ' + ip4 + ' is listed as a tor exit');
        }
    }

    if (errors.length !== 0) {
        send_error(req, res, "<p>" + errors.join('<br/>') + "</p>");
        return;
    }
    // done checking for errors

    req.session.gb_name = name;
    req.session.gb_email = email;
    req.session.gb_hidemail = req.body.hidemail;

    let records = await Sequelize.Guestbook.findAll({
        where: {
            ip: req.ip
        }
    });
    let latest = 0;
    for (const record of records) {
        if (record.time > latest) latest = record.time;
    }
    const time = Math.floor(Date.now() / 1000);

    if (time - latest < 60) {
        send_error(
            req,
            res, 
            'You are allowed to send 1 message per minute. You will be able to send next message in ' + ((latest + 60) - time) + ' seconds.'
        );
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
        res.template('guestbook.pug', {
            current_route: req.originalUrl,
            ip: req.ip,
            errors: 'Could not create a new record'
        });
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
            return send_error(req, res, 'You don\'t have permission to delete this record.');
        }
    }
    catch (err) { next(err); }
}

async function rss(req, res) {
    const data = (await Sequelize.Guestbook.findAndCountAll({where: {hidden: false}})).rows;

    let rss = [{
        rss: [{
            _attr: {version: '2.0'}
        },
        {
            channel: [
                {title: 'Guestbook'},
                {link: req.protocol + '://' + req.get('host') + '/guestbook'},
                {description: 'Alice\'s guestbook'},
            ]
        }]
    }]

    for (const record of data) {
        if (record.email == null || record.email == undefined) {
            record.email = 'no@email.com';
        }
        if (record.hidemail)
            record.email = ('?'.repeat(record.email.split('@')[0].length)) + '@?.?';

        rss[0].rss[1].channel.push({
            item: [
                {description: record.text},
                {author: `"${record.name}"${record.email ? (' at ' + record.email) : ''}`},
                {link: req.protocol + '://' + req.get('host') + '/guestbook#gb_entry_' + record.id}
            ]
        });
    }

    let ident = 0;
    if (req.query.ident) ident = req.query.ident;

    res.header('Content-Type', 'application/rss+xml');
    res.send(xml(rss, {indent: ' '.repeat(ident)}));
    return;
}

module.exports = (router) => {
    router.get('/guestbook', handler(guestbook));
    router.post('/guestbook/submit', handler(submit));
    router.get('/guestbook/del/:id', handler(del));
    router.get('/guestbook.rss', handler(rss));
}