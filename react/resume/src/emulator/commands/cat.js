import { Terminal } from 'xterm';
const fs = require('../fs');

/**
 * 
 * @param { string[] } argv 
 * @param { Terminal } terminal 
 */
module.exports = (argv, terminal) => {
    if (argv.indexOf('--help') != -1) {
        terminal.writeln(`Usage: ${argv[0]} [files] [-n]`);
        terminal.writeln('  -n --number  show lines numbers');
        terminal.writeln('     --help    show this help');
        terminal.writeln('Read files into stdout');
        return;
    }
    const numbers = (argv.indexOf('-n') != -1) || (argv.indexOf('--number') != -1);
    
    let files = argv.filter(x => { return !x.startsWith('-') });
    files.shift();
    files.forEach(file => {
        const lines = fs.readFileSync(file).toString().split('\n');
        
        if (numbers) {
            lines.forEach((line, i) => {
                terminal.write('\033[35m' + i + ' |\033[0m ');
            })
        } else {
            terminal.write(file);
            /// print % if no newline at eof
            if (lines[lines.length - 1] != '') 
                terminal.write('\033[30;47m%\033[0m\n');
        }
    })
}