
import { Terminal } from 'xterm';

/**
 * @type {Terminal}
 */
let terminal;

const prompt = '\033[1;32muser@blek.codes \033[36m~ $ \033[0m';
let cmd = '';

function pr_char(char) {
    cmd += char;
    terminal.write(char);
}

function exec_cmd() {
    let c = cmd;
    reset_cmd();
    terminal.writeln('zsh: command not found: ' + c);
    print_prompt();
}

function print_prompt() {
    terminal.write(prompt);
}

function reset_cmd() {
    cmd = '';
    terminal.writeln('');
}

function control_char(char) {
    const id = char.codePointAt(0);
    switch (id) {

        // backspace
        case 127:
            if (terminal.buffer.active.cursorX == prompt.length) break;
            terminal.write('\b \b');
            cmd = cmd.substring(0, cmd.length - 1);
            break;

        // enter
        case 13:
            exec_cmd();
            break;
        
        // Ctrl+c
        case 3:
            terminal.write('^C');
            reset_cmd();
            print_prompt();
            break;

        default:
            console.log('Unknown special char: ' + id);
            break;
    }
}

function key(e) {
    if (RegExp(/^\p{L}/,'u').test(e.key)) {
        pr_char(e.key);
    } else {
        control_char(e.key);
    }
}

module.exports = (t) => {
    terminal = t;
    terminal.onKey(key);
    terminal.write(prompt); 
}