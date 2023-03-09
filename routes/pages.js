const handler = require('express-async-handler');

async function services(req, res) {
    res.template('page/services.pug');
}


module.exports = (router) => {
     router.get('/services', handler(services))
}