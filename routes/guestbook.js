const Helpers = require('../helpers');
const Sequelize = require('../models');

async function handler(req, res, next) {
    try {

        let data = {};
        let sqldata = await Sequelize.Guestbook.findAll({
            where: {
                hidden: false
            }
        });
        if (!sqldata) throw new Error('Failed to get guestbook entries');

        for (let i = 0; i != sqldata.length; i++) {
            data[sqldata[i].id] = sqldata[i];
        }

        res.send(await Helpers.ViewLoader.load('guestbook.pug', {
            current_route: req.originalUrl,
            ip: req.ip,
            data
        }));
        return;
    } catch (err) {
        next(err);
    }
}

async function submit(req, res, next) {
    const { name, email, message } = req.body; 
    const hidemail = req.body.hidemail ? (req.body.hidemail == 'on' ? true : false) : false;

    let data = await Sequelize.Guestbook.create({
        name,
        email,
        text: message,
        hidemail,
        ip: req.ip,
        hidden: false,
        time: Math.floor(Date.now() / 1000)
    });
    if (!data) next(new Error('Failed to create a new record.'));
    
    res.redirect('/guestbook#gb_entry_' + data.id);

    return;
}

module.exports = (router) => {
    router.get('/guestbook', handler);
    router.post('/guestbook/submit', submit);
}