module.exports = (dom) => {
    const terminal = dom.terminal;

    terminal.writeln('Welcome to my online resume!')
    terminal.writeln('Type \033[1;32mhelp\033[0m for list of commands')
    terminal.writeln('');

    require('./zsh')(terminal, dom);
}