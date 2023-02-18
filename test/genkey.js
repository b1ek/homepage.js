const test = require('unit.js');
const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

describe('TestS generate key script', () => {

    it('Check if key is generated properly', () => {
        const stdout = execSync('node ./scripts/generate_key.js --key-only').toString('utf-8');
        const key = Buffer.from(stdout, 'base64');
        test.number(key.length).is(256);
    });
    it('Check if file is edited properly', () => {
        const stdout = execSync('node ./scripts/generate_key.js -s').toString('utf-8');
        const file = fs.readFileSync(path.resolve('.env'));
        test.string(stdout).isNot(file);
    });

});