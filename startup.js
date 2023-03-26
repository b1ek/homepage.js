console.log('Executing startup jobs...');

const fs = require('fs');
const { crc32 } = require('easy-crc');

const hrt = () => {
    let hr = process.hrtime();
    return hr[0] + hr[1] / 1000000;
}

// load dotenv
let dotpath = (process.env.APP_DEBUG == 'true') ? '.env.debug' : '.env.prod';
if (!fs.existsSync(dotpath)) dotpath = '.env';
require('dotenv').config({
    path: dotpath
});

// load debug
if (process.env.APP_DEBUG == 'true') {
    process.env.APP_DEBUG = true;
    process.env.DEBUG = '*/*';
} else {
    process.env.DEBUG = null;
    process.env.NODE_DEBUG = null;
    process.env.APP_DEBUG = false;
}

// build resume page
if ((!fs.existsSync('public/static/dist/resume.js')) && (!process.env.APP_DEBUG)) {
    console.log('Resume files do not exist!');
}

// load key
if (!process.env.APP_KEY)
    throw new Error('APP_KEY is not set.')

console.log('Using a key with CRC32: ' + crc32('CRC-32', process.env.APP_KEY));

async function startup() {
    let t1 = hrt();

    await require('./helpers').ViewLoader.preload();
    console.log('Views compiled in ' + (hrt() - t1) + ' ms');

    console.log('Finished in ' + (hrt() - t1) + " ms");
}

module.exports = startup();
