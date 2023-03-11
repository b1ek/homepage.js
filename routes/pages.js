const handler = require('express-async-handler');

async function services(req, res) {
    res.template('page/services.pug');
}

async function resume(req, res) {
    res.template('page/resume.pug');
    console.log(process.env.APP_DEBUG);
}

module.exports = (router) => {
    router.get('/services', handler(services))
    router.get('/resume', handler(resume))
}