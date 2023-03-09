import Files from '../files';

module.exports = (args) => {
    if (args == undefined) args = '';
    if (Files[args]) return Files[args];
    return `cat: cannot open file '${args}': no such file or directory`
}