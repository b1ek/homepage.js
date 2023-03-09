import Files from '../files';

module.exports = {
    cat: {
        description: 'Show contents of a file',
        fn: require('./cat')
    },
    ls: {
        description: 'Show files in current directory',
        fn: ()=>{
            return Object.keys(Files).join('  ');
        }
    }
}