import Files from '../files';

import Colored from '../../helpers/color';

const commands = (terminal) => {
    const commands = {
        cat: {
            description: 'Show contents of a file',
            fn: require('./cat')
        },
        ls: {
            description: 'Show files in current directory',
            fn: () => {
                return '\'ls\' is not recognized as an internal or external command, operable program or batch file.';
            },
            unlisted: true
        },
        dir: {
            description: 'Show files in current directory',
            fn: () => {
                return <pre style={{color: '#2e8b7e', fontWeight: 'bold', margin: '0'}}>
                    {Object.keys(Files).join('   ')}
                </pre>;
            }
        },
        skills: {
            description: 'My skills data',
            fn: require('./skills')
        },

        clear: {
            description: 'Clear the terminal.',
            fn: () => {
                terminal.current.clearStdout();
            }
        },

        socials: {
            description: 'View my social links',
            fn: require('./social')
        },
        social: {
            description: 'View my sociala links',
            fn: require('./social'),
            unlisted: true,
        }
    };

    commands.help = {
        unlisted: true,
        fn: () => {
            return (
                <pre>
                    Commands list:
                    <table>
                        <tbody>
                            {
                                Object.keys(commands).map((cmd, i) => {
                                    if (commands[cmd].unlisted) return;
                                    return <tr key={i}>
                                        <td style={{color: 'aquamarine'}}>{cmd}</td>
                                        <td style={{padding: '0 8px'}}> : </td>
                                        <td style={{color: 'white'}}>{commands[cmd].description}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </pre>
            );
        }
    }

    return commands;
}

module.exports = commands;