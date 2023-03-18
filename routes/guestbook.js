const Sequelize = require('../models');
const xml = require('xml');
const handler = require('express-async-handler');

const send_error = async (res, error) => {
    return res.redirect('/guestbook?error=' + encodeURIComponent(error));
};

async function guestbook(req, res, next) {
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
    if (name.match(/^\s*$/g)) {
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
    if (errors.length !== 0) {
        send_error(res, "<p>" + errors.join('<br/>') + "</p>");
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
        res.redirect(
            '/guestbook?error=' +
            encodeURIComponent(
                'You are allowed to send 1 message per minute. You will be able to send next message in ' + ((latest + 60) - time) + ' seconds.'
            )
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
            res.redirect('/guestbook?error=' + encodeURIComponent('You don\'t have permission to delete this record.'))
            return
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
        console.log(record);
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