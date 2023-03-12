
import { Terminal } from 'xterm';

/**
 * @type {Terminal}
 */
let terminal;

const prompt = '\033[1;32muser@blek.codes \033[36m~ $ \033[0m';
let cmd = '';
let history = [];
let history_pos = 0;

function text_prompt() {
    return prompt.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

function pr_char(char) {
    cmd += char;
    terminal.write(char);
    // console.log(char.charCodeAt(0));
    if (history_pos != 0) history_pos = 0;
}

function exec_cmd() {
    let c = cmd;
    reset_cmd();
    history.unshift(c);
    terminal.writeln('zsh: command not found: ' + c);
    print_prompt();
    history_pos = 0;
}

function print_prompt() {
    terminal.write(prompt);
}

function reprint_prompt() {
    terminal.write('\033[2K\r');
    print_prompt();
}

function history_up() {
    if (history_pos != history.length) {
        reprint_prompt();
        terminal.write(history[history_pos]);
        history_pos++;
    }
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
            if (terminal.buffer.active.cursorX <= text_prompt().length) break;
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

        // history up
        case 27:
            history_up();
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