const express = require('express');
const router = express.Router();
const glob = require('glob');

glob(__dirname + "/**/*.js", {}, (er, data) => {
    if (er) {
        console.error(er);
        process.exit(-1);
    }
    data
        .filter(file => {
            return !file.endsWith('index.js')
        })
        .forEach(file => {
            require(file)(router);
        });
});

module.exports = router;