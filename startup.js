console.log('Executing startup jobs...');

const fs = require('fs');
const crc32 = require('crc-32');
const glob = require('glob');
const { exec } = require('child_process');

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
}

// load key
if (!process.env.APP_KEY)
    throw new Error('APP_KEY is not set.')

// import gpg keys
glob('data/userdata/*_gpgkey', async (err, files) => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    files.filter(
        file => {
            return !file.startsWith('.')
        }
    ).forEach(file => {
        exec('gpg --import ' + file, (err, stdout, stderr) => {
            if (err) {
                console.error(`Errors while importing ${file}: ${err}`);
                process.exit(-1);
            }
            console.log(`Imported ${file} key`);
        });
    });

});

// TODO: perhaps a better approach to storing it????
//                                                               ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
process.env.APP_KEY = Buffer.from(process.env.APP_KEY, 'base64').toString('ascii');

console.log('Using a key with CRC32: ' + crc32.str(process.env.APP_KEY).toString(16));

async function startup() {
    let t1 = hrt();

    await require('./helpers').ViewLoader.preload();
    console.log('Views compiled in ' + (hrt() - t1) + ' ms');

    console.log('Finished in ' + (hrt() - t1) + " ms");
}

module.exports = startup();
