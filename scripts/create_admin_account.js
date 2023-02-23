process.env.DEBUG = undefined;

const db = require('../models');
const args = require('args-parser')(process.argv);
const { authenticator } = require('otplib');
const path = require('path');
const crypto = require('crypto');
const qrcode = require('qrcode-terminal');
const prompt = require('prompt-sync')({ sigint: true, eot: true });
const bcrypt = require('bcrypt')

if (args['help']) {
    console.log(path.basename(__filename) + ' [--pass] [--login] [--email] [--gpgkey] [--dry-run] [--no-interactive|-n] [--totp] [--set-totp] [--set-totp-recovery]');
    console.log(
        '  --pass: Set password.\n' + 
        '  --login: Set login.\n' + 
        '  --email: Set email.\n' + 
        '  --gpgkey: Set path to your GPG key.\n' + 
        '  --dry-run: Don\'t do anything, but simulate like something is done.\n' + 
        '  --no-interactive -n: Disable prompts. Designed for script usage.\n' + 
        '  --totp: Add TOTP to the account. QR code and recovery codes would be printed to terminal.\n' + 
        '  --set-totp: Set TOTP key. Designed for script usage.\n' +
        '  --set-totp-recovery: Set TOTP recovery keys (comma separated).'
    )
    process.exit(0);
}

function exit_error(error, exitCode) {
    if (!exitCode) exitCode = -1;
    console.error(error);
    process.exit(exitCode);
}

let interactive = true;
if (args['no-interactive']) interactive = false;

// get data
let password, login, email, gpgkey;
let totpkey, totprecover, totpurl;
if (args['pass']) {
    password = args['pass'];
} else if (interactive) {
    // node does not provide a way to
    // get a password with hidden stdin
    password = prompt('Password: ');
    console.clear();
} else exit_error('No password supplied.');

if (args['login']) {
    login = args['login'];
} else if (interactive) {
    login = prompt('Login: ');
} else exit_error('No login supplied.');

if (args['email']) {
    email = args['email'];
} else if (interactive) {
    email = prompt('Email: ');
} else exit_error('No email supplied.');

if (args['gpgkey']) {
    gpgkey = require('fs').readFileSync(args['gpgkey'], {encoding: 'utf-8'}).toString();
} else if (interactive) {
    gpgkey = prompt('Paste your GPG key:\n');
} else exit_error('No GPG key supplied.')

if (args['totp']) {
    totpkey = authenticator.generateSecret(32);
    totprecover = [];
    for (let i = 0; i != 6; i++) {
        totprecover[i] = crypto.randomInt(11111111, 99999999);
    }

    totpkey = args['set-totp'] ? args['set-totp'] : totpkey;
    totprecover = args['set-totp-recovery'] ? args['set-totp-recovery'].split(',') : totprecover;

    totpurl = `otpauth://totp/blek/${login}@blek.codes?secret=${totpkey}&issuer=blek`;
    qrcode.generate(totpurl);
    console.log('Totp URL: ' + totpurl);
    console.log('Recovery keys:');
    for (let i = 0; i <= totprecover.length - 2; i+= 2) {
        console.log('  ' + totprecover[i] + ', ' + totprecover[i+1]);
    }
}
password = '' + password;

// insert data
if (args['dry-run']) {
    console.log('All done');
    process.exit(0);
}

const salt = bcrypt.genSaltSync(12);
const pass = bcrypt.hashSync(password, salt);


async function create() {
    const data = await db.User.findAndCountAll({where: {login}});
    if (data.count !== 0) {
        console.error('User with this login already exists.');
        process.exit(0);
    }

    const user = await db.User.create({
        login,
        email,
        pass,
        accessLevel: 4,
        gpgkey,
        totp: totpkey,
        totpRec: totprecover ? totprecover.join(',') : undefined
    });
    console.log('All done');
    process.exit(0);
}

create();