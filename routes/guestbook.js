const Helpers = require('../helpers');
const Sequelize = require('../models');

async function handler(req, res, next) {
    try {
        res.send(await Helpers.ViewLoader.load('guestbook.pug', {
            current_route: req.originalUrl,
            ip: req.ip,
            data: {
                // TODO: load from db
                1: {
                    name: 'John Doe',
                    email: 'a@b.c',
                    text: 'hiiii',
                    hidemail: false,
                    ip: '0.0.0.0',
                    hidden: false,
                    time: Date.now()
                }
            }
        }));
        return;
    } catch (err) {
        next(err);
    }
}

async function submit(req, res) {
    const { name, email, message } = req.body; 
    const hidemail = req.body.hidemail ? (req.body.hidemail == 'on' ? true : false) : false;
    
    res.send({
        name, email, message, hidemail
    });

    // console.log(Sequelize.Guestbook);

    return;
}

module.exports = (router) => {
    router.get('/guestbook', handler);
    router.post('/guestbook/submit', submit);
}