const fs = require('fs');

// fucking es6
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

let exits_list;
let is_job_running;

if (exits_list == undefined) {
    if (!fs.existsSync('store/torexits.json')) {
        refreshList();
    } else {
        exits_list = JSON.parse(fs.readFileSync('store/torexits.json', {encoding: 'utf-8'}));
    }
}

function isOutdated() {
    // list expires in 4 hours
    return Date.now() - exits_list.last_update > 1000 * 60 * 60 * 4;
}

async function check(ip) {
    if (!exits_list) {
        await refreshList();
    }
    return exits_list.ips.indexOf(ip) !== -1;
}

async function refreshList() {
    let data = {
        last_update: Date.now(),
        ips: undefined
    };

    let raw_list = await (await fetch('https://check.torproject.org/torbulkexitlist')).text();
    let ips = raw_list.replace('\r', '').split('\n');
    exits_list = {
        last_update: Date.now(),
        ips
    };

    fs.writeFileSync('store/torexits.json', JSON.stringify(exits_list, undefined, process.env.APP_DEBUG ? '   ' : undefined));
}

async function run_refresh_job() {
    if (isOutdated()) {
        refreshList();
    }
    setTimeout(run_refresh_job, 1000 * 60 * 30);
}

module.exports = { check, isOutdated };