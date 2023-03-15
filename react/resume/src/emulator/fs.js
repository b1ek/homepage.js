const { fs } = require('memfs');
fs.writeFileSync('README.md', 'uwu');

module.exports = fs;