import Files from '../files';

import Colored from '../../helpers/color';

module.exports = {
    cat: {
        description: 'Show contents of a file',
        fn: require('./cat')
    },
    ls: {
        description: 'Show files in current directory',
        fn: ()=>{
            return <pre style={{color: '#2e8b7e', fontWeight: 'bold'}}>
                {Object.keys(Files).join('   ')}
            </pre>;
        }
    },
    skills: {
        description: 'My skills data',
        fn: require('./skills')
    }
}