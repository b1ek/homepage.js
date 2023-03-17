
import { Terminal } from 'xterm';
import { XTerm } from 'xterm-for-react';

const fs = require('./fs');
global.fs = fs;
const cmds = require('./commands');

/**
 * @type { Terminal }
 */
let terminal;

/**
 * @type { XTerm }
 */
let dom;

const prompt = '\033[1;32muser@blek.codes \033[36m~ $ \033[0m';
let cmd = '';
let lastcmd = window.sessionStorage.getItem('last_cmd') || '';

function text_prompt() {
    return prompt.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

/**
 * 
 * @param { string } char 
 * @param { KeyboardEvent } dom 
 */
function pr_char(char, dom) {
    if (dom.key.length != 1) return;

    cmd += char;
    terminal.write(char);
}

function exec_file(f) {

    const exists = fs.existsSync(f);
    if (!exists) {
        terminal.write('zsh: no such file or directory: ' + f);
        return;
    }

    const executable = fs.accessSync(f, fs.constants.X_OK);
    if (!executable) {
        terminal.writeln('zsh: permission denied: ' + f);
        return;
    }
    
    terminal.writeln('This is an online resume. It is not big enough to have a script runtime.\n');
    return;
}

async function exec_cmd() {
    let c = cmd;
    const command = c.split(' ')[0];
    reset_cmd(c);
    lastcmd = c;
    window.sessionStorage.setItem('last_cmd', c);

    if (command == '') {
        print_prompt();
        return;
    }

    // if path
    if (command.match(/^((\.|\.\.)\/|\/).+$/gm)) {
        exec_file(command);
        terminal.writeln('');
        print_prompt();
        return;
    }

    if (cmds[command] != undefined) {
        const startY = terminal.buffer.normal.cursorY

        await cmds[command](c.split(' '), terminal);

        await (new Promise(resolve => setTimeout(resolve, 10)));

        if (terminal.buffer.active.cursorX != 0 && startY != terminal.buffer.active.cursorY) {
            terminal.write('\033[30;47m%\033[0m\n');
        }
        print_prompt();
        return;
    }
    
    terminal.writeln('zsh: command not found: ' + command);
    print_prompt();
}

function print_prompt() {
    terminal.write(prompt);
}

function reprint_prompt() {
    terminal.write('\033[2K\r');
    print_prompt();
}

function reset_cmd() {
    cmd = '';
    terminal.writeln('');
}

function cbackspace() {
    let exploded = cmd.split(' ');
    if (exploded.length >= 1) {
        reprint_prompt();
        cmd = '';
        return;
    }
    exploded.pop();
    
    cmd = exploded.join(' ') + ' ';
    reprint_prompt();
    terminal.write(cmd);
    return;

}

function backspace(isCtrl) {
    if (terminal.buffer.active.cursorX <= text_prompt().length) return;

    if (isCtrl) {
        return cbackspace();
    }

    terminal.write('\b \b');
    cmd = cmd.substring(0, cmd.length - 1);
}

/** @param { KeyboardEvent } dom */
function control_char(id, dom) {
    
    switch (id) {

        // backspace
        case 8:
            backspace(dom.ctrlKey);
            break;

        // enter
        case 13:
            exec_cmd();
            break;
        
        case 38:
            if (lastcmd == '') break;
            cmd = lastcmd;
            reprint_prompt();
            terminal.write(lastcmd);
            break;
        
        // Ctrl+c
        case 67:
            if (dom.ctrlKey) {
                terminal.write('^C');
                reset_cmd();
                print_prompt();
                break;
            }

        case 86:
            if (dom.altKey) break;

        default:
            if (dom.ctrlKey && (dom.key.length == 1)) {
                terminal.write('^' + dom.key.toUpperCase());
                break;
            }

            terminal.write('<');
            if (dom.ctrlKey)    terminal.write('C');
            if (dom.altKey)     terminal.write('A');
            if (dom.shiftKey)   terminal.write('S');
            terminal.write(`${id}>`)
            break;
    }
}

function key(e) {
    /** @type {KeyboardEvent} */
    const dom = e.domEvent;
    if (dom.key.length == 1 && !(dom.ctrlKey || dom.altKey)) {
        pr_char(e.domEvent.key, dom);
    } else {
        control_char(e.domEvent.keyCode, dom)
    }
}

function register(t, d) {
    terminal = t;
    dom = d;

    terminal.onKey(key);
    terminal.write(prompt);
}

register.pr_char = pr_char;

module.exports = register;