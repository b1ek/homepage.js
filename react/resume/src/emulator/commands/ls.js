const { Terminal } = require('xterm');
const fs = require('../fs');

/**
 * 
 * @param {string[]} argv 
 * @param {Terminal} terminal 
 */
module.exports = (argv, terminal) => {
    if (argv.indexOf('--help') != -1) {
        terminal.writeln(`Usage: ${argv[0]} [dirs] [-a|--all] [-l]`);
        terminal.writeln('Lists files in directories');
        terminal.writeln('  -a --all List all files (including those who start with .)');
        terminal.writeln('  -l       Use long listing format');
        return;
    }

    const has_arg = (arg) => {return argv.indexOf(arg) != -1};

    let directories = [...argv];

    const all = (has_arg('-a') || has_arg('--all'));
    const long_format = has_arg('-l');

    directories.shift();

    // remove .* files if -a not specified
    if (!all)
        directories = directories.filter(x => x.startsWith('.'));
    
    // remove arguments
    directories = directories.filter(x => !x.startsWith('-'));

    if (directories.length == 0) directories = ['.'];

    // remove dublicates
    directories = [...new Set(directories)];

    directories.forEach((dir, i) => {
        
        if (directories.length != 1) {
            terminal.writeln(dir + ':');
            terminal.writeln('');
        }

        let files = fs.readdirSync(dir);
        files.forEach((file, i) => {
            
            if (!fs.accessSync(file, fs.constants.X_OK))
                terminal.write('\033[1;32m');
            if (fs.accessSync(file, fs.constants.R_OK))
                terminal.write('\033[35m');

            terminal.write(file + '\033[0m  ');
            if ((i+1) % 5 == 0)
                terminal.writeln('');
        });
        terminal.writeln('');
    })
}