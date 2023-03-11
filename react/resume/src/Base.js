import React, { Component } from 'react';
import Terminal from 'react-console-emulator';
import Files from './emulation/files';
import commands from './emulation/commands';
import Colored from './helpers/color';

import './font/sourcecode.css';

const welcome = <pre>
Welcome to my resume!<br/>
Type 
<Colored color='#156ea4'> help </Colored>
for a list of commands.
</pre>;

const inputStyle = { color: '#2e8b7e', fontWeight: 'bold' };

export class Base extends Component {
    constructor(props) {
        super(props);
        this.terminal = React.createRef();
    }
    render() {
        return (
            <Terminal
                ref={this.terminal}
                commands={commands(this.terminal)}
                welcomeMessage={welcome}
                promptLabel={
                    /*
                    <table className='prompt_table'>
                        <tbody>
                            <tr>
                                <td style={inputStyle}>user@blek.codes</td>
                                <td className='prompt_spacing'></td>
                                <td style={{color: '#2968ac'}}> ~/resume </td>
                                <td className='prompt_spacing'></td>

                                <td style={{color: '#ff5092'}}>(</td>
                                <td className='prompt_spacing'></td>

                                <td style={{color:'limegreen'}}>master</td>
                                <td className='prompt_spacing'></td>
                                <td style={{color: '#ff5092'}}>)</td>
                                <td className='prompt_spacing'></td>

                                <td>$</td>
                            </tr>
                        </tbody>
                    </table>
                    */
                   data.ip ?
                   (data.ip + '@blek.codes $') :
                   '$ '
                }
                
                errorText={'zsh: command not found: [command]'}

                className='console'

                promptLabelStyle={inputStyle}
                inputTextStyle={{...inputStyle, color: '#5ba2b0', transform: 'translate(2px, 2px)'}}

                styleEchoBack={'fullInherit'}
                noDefaults
            />
        )
    }

    componentDidMount() {
        this.terminal.current.focusTerminal();
    }
}