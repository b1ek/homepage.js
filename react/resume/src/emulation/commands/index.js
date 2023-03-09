import Files from '../files';

const Colored = (p) => {
    return <span style={{color: p.color, fontWeight: 'bold  '}}>{...p.children}</span>
}

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
        fn: () => {
            return (<pre>
                <Colored color='#00ffe7'>Web dev (PHP & JS)</Colored>
                <br/>
                [#####] 100%<br/>
                My main work field<br/>
                <br/>

                <Colored color='#cc6a6a'>C/C++/Rust native dev</Colored><br/>
                [##   ] 40%<br/>
                I do this... sometimes<br/>
                <br/>

                <Colored color='#7dadd7'>Linux skills</Colored><br/>
                [#####] 100%<br/>
                Do this all the time. I run linux on my laptop, pc and server<br/>
                <br/>

                <Colored color='#2e8b7e'>Being cishet</Colored><br/>
                [     ] 0%<br/>
                Never liked it<br/>
            </pre>)
        }
    }
}