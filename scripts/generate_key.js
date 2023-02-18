const crypto = require('crypto');
const path = require('path');
const args = require('args-parser')(process.argv);
const fs = require('fs');

let key = crypto.randomBytes(256).toString('base64');
let dotenv = path.resolve('.env');

if (args['help']) {
    console.log(path.basename(__filename) + ' [--key-only] [--env|-e] [--set-key] [--dry-run]');
    console.log('\n' + 
        '  --help: Display this help\n' +
        '  --key-only: Generate key only and put it in stdout\n' + 
        '  --env -e: Specify an env file\n' +
        '  --set-key: Specify your key\n' +
        '  --dry-run: Don\'t write anything, just do the thing'
    )
}

if (args['key-only']) {
    console.log(key);
    process.exit(0);
}
if (args['env'] || args['e']) {
    dotenv = args['env'] ? args['env'] : args['e'];
}
if (args['set-key']) {
    key = args['set-key'];
}

const file = fs.readFileSync(dotenv).toString('utf8');

let lines = file.split('\n');

for (let i = 0; i != lines.length; i++) {
    let line = lines[i];
    if (line.startsWith('APP_KEY=')) {
        lines[i] = 'APP_KEY=' + key;
    }
}

const newfile = lines.join('\n');

if (!args['dry-run']) {
    fs.writeFileSync(dotenv, newfile);
}