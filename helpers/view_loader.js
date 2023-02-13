const Eta =     require('eta');
const fs =      require('fs/promises');
const glob =    require('glob');

const cwd =     process.cwd();
const layoutdir = cwd + '/view';

let compiled = {};


async function loadFile(file) {
    if (compiled[file]) return compiled[file];
    compiled[file] = Eta.compile(await fs.readFile(file, 'utf8'));

    return compiled[file];
}


async function preload() {
    glob(layoutdir + '/*.eta', (err, files) => {
        files.filter(file => {return !file.startsWith('.');})
            .forEach(file => {
                loadFile(file);
            });
    });
}


async function load(name, data) {
    return (await loadFile(cwd + '/view/' + name))(data, Eta.config);
}


module.exports = { load, loadFile, preload }