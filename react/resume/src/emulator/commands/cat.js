import { Terminal } from 'xterm';
const fs = require('../fs');

/**
 * 
 * @param { string[] } argv 
 * @param { Terminal } terminal 
 */
module.exports = (argv, terminal) => {
    if (argv.indexOf('--help') != -1) {
        terminal.writeln('Usage: cat [file] [-n]');
        terminal.writeln('  -n --number: show lines numbers');
        terminal.writeln('     --help:   show this help');
        return;
    }
    const numbers = (argv.indexOf('-n') != -1) || (argv.indexOf('--number') != -1);
    
    let files = argv.filter(x => { return !x.startsWith('-') });
    files.shift();
    files.forEach(file => {
        const lines = fs.readFileSync(file).toString().split('\n');
        let i = 1;
        lines.forEach(line => {
            if (numbers) terminal.write('\033[35m' + i + ' |\033[0m ');
            terminal.writeln(line);
            i++;
        })
    })
}