console.log('Executing startup jobs...');

const fs = require('fs');

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

    await require('./helpers').ViewLoader.preload();
    console.log('Views compiled in ' + (hrt() - t1) + ' ms');

    console.log('Finished in ' + (hrt() - t1) + " ms");
}

startup();
