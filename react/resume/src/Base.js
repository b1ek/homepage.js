import React, { Component } from 'react';
import Terminal from 'react-console-emulator';
import Files from './emulation/files';
import commands from './emulation/commands';
import Colored from './helpers/color';

import './font/sourcecode.css';
import './style.css';

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
                    /*<pre>
                        user@blek.codes 
                        <span style={{color: '#2968ac'}}> ~/resume </span>
                        <span style={{color: '#ff5092'}}>(
                            <span style={{color:'limegreen'}}>master</span>
                        ) </span>
                        $ 
                    </pre>*/
                        '$ '
                }
                
                errorText={'zsh: command not found: [command]'}

                className='console'

                promptLabelStyle={inputStyle}
                inputTextStyle={{...inputStyle, color: '#5ba2b0', transform: 'translateY(2px)'}}

                styleEchoBack={'fullInherit'}
                noDefaults
                noAutoScroll
            />
        )
    }
}