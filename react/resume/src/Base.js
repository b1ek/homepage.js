import React, { Component } from 'react';
import Terminal from 'react-console-emulator';
import Files from './emulation/files';
import commands from './emulation/commands';

const welcome = `
Welcome to my resume!
Type 'help' for list of commands.
`;

export class Base extends Component {
    render() {
        return (
            <Terminal
                commands={commands}
                welcomeMessage={welcome}
                promptLabel={'user@blek.codes/resume~$'}
            />
        )
    }
}