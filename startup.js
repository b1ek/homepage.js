console.log('Executing startup jobs...');

if (process.env.APP_DEBUG) {
    process.env.DEBUG = '*/*';
}

const fs = require('fs');
const {Base64} = require('js-base64');
const crc32 = require('crc-32');

const hrt = () => {
    let hr = process.hrtime();
    return hr[0] + hr[1] / 1000000;
}

async function startup() {
    let t1 = hrt();

    let dotpath = (process.env.APP_DEBUG == 'true') ? '.env.debug' : '.env.prod';
    
    if (!fs.existsSync(dotpath)) dotpath = '.env';

    require('dotenv').config({
        path: dotpath
    });

    if (!process.env.APP_KEY) {
        throw new Error('APP_KEY is not set.')
    }
    process.env.APP_KEY = Base64.decode(process.env.APP_KEY);
    if (process.env.APP_KEY.length !== 256) {
        throw new Error('APP_KEY has to be a 256-byte base64 string.');
    }
    console.log('Using a key with CRC32: ' + crc32.bstr(process.env.APP_KEY.toString(16)));

    await require('./helpers').ViewLoader.preload();
    console.log('Views compiled in ' + (hrt() - t1) + ' ms');

    console.log('Finished in ' + (hrt() - t1) + " ms");
}

startup();
