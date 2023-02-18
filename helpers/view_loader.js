const pug =     require('pug');
const fs =      require('fs');
const glob =    require('glob');
const path =    require('path');

const cwd =     process.cwd();
const layoutdir = cwd + '/view';

let compiled = {};

async function loadFile(file) {
    if (compiled[file]) return compiled[file];
    compiled[file] = await pug.compileFile(file);
    return compiled[file];
}

async function load(name, data) {
    if (!(await exists(name)))
        throw new Error("This view does not exist.");
    return (await loadFile(layoutdir + '/' + name))(data);
}

async function exists(name) {
    return fs.promises.access(layoutdir + '/' + name, fs.constants.R_OK)
        .then(() => true)
        .catch(() => false);
}

async function preload() {
    await glob(layoutdir + '/**/*.pug', (err, files) => {
        files.filter(file => {
            return !file.startsWith('.') &&
                (!fs.lstatSync(file).isDirectory())
        }).forEach(file => {
            loadFile(file);
        });
    });
}

module.exports = { load, loadFile, preload, exists }