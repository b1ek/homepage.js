const handler = require('express-async-handler');

async function services(req, res) {
    res.template('page/services.pug');
}

async function resume(req, res) {
    res.template('page/resume.pug');
    console.log(process.env.APP_DEBUG);
}

async function about(req, res) {
    res.template('about.pug', {
        current_route: req.originalUrl
    });
}

module.exports = (router) => {
    router.get('/services', handler(services))
    router.get('/resume', handler(resume))
    router.get('/about', handler(about));
}