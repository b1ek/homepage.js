const pug =     require('pug');
const fs =      require('fs/promises');
const glob =    require('glob');

const cwd =     process.cwd();
const layoutdir = cwd + '/view';

let compiled = {};

async function loadFile(file) {
    if (compiled[file]) return compiled[file];
    compiled[file] = await pug.compileFile(file);
    return compiled[file];
}

async function load(name, data) {
    return (await loadFile(layoutdir + '/' + name))(data);
}

async function preload() {
    await glob(layoutdir + '/**/*', (err, files) => {
        files.filter(file => {
            return !file.startsWith('.');
        }).forEach(file => {
            loadFile(file);
        });
    });
}

module.exports = { load, loadFile, preload }