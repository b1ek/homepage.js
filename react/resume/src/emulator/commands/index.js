let cmds = {
    'cat': require('./cat'),
    'cmds': require('./cmds'),
    'cmdls': require('./cmds'),
    'help': require('./cmds'),
    'ls': require('./ls'),
    'skills': require('./skills'),
    'mkdir': require('./mkdir'),
    'wget': require('./wget'),

    // alias l='ls -l'
    'l': (a,t) => {require('./ls')([...a, '-l'], t)},
};

module.exports = cmds;