const Helpers = require('../helpers');
const handler = require('express-async-handler');

// this is sent if some wise ass performs GET /.env
async function dotenv(req, res) {
    res.header('Content-Type', 'text/plain');
    res.send(
        'APP_URL=http://blek.codes\n' +
        'APP_PORT=http,80;https,443\n' +
        'APP_DEBUG=true\n' +
        '\n' +
        'DB_PASSWORD=i_am_transfem_uwu\n' +
        'DB_HOST=db-central.blek.codes\n' +
        'DB_PORT=44839\n' +
        'DB_TABLE=uwu\n' +
        '\n' +
        '# TODO: Change SSH password\n' +
        'SSH_USERNAME=blek\n' +
        'SSH_PASSWORD=coolpass123\n' +
        'SSH_HOSTNAME=blek.codes\n' +
        'SSH_PORT=22\n' +
        '\n'


        // eof new line
        + '\n'
    );
}

module.exports = (router) => {
    router.get('/.env', handler(dotenv));
}