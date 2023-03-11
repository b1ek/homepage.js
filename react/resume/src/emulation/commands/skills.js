import Colored from '../../helpers/color';

const Title = (p) => {return <h3 style={{margin: '16px 0', color: '#526b93'}}>{...p.children}</h3>}

const projects = {
    web: [
        {
            name: 'blek! Site',
            source: 'https://github.com/b1ek/blekSite',
            desc: 'Second rewrite of my website in Laravel'
        },
        {
            name: 'homepage.js',
            source: 'https://git.blek.codes/blek/homepage.js',
            desc: 'Third re write of my website in Node/Express.JS/Pug and couple other libs'
        },
        {
            name: 'blek! Sail',
            source: 'https://github.com/b1ek/sail',
            desc: 'A production-ready server for serving Laravel projects'
        },
        {
            name: 'blek! ID',
            source: 'https://github.com/b1ek/blekID',
            desc: 'An auth server. Not really proud of this one, as the code is very spaghetti and practically useless.'
        },
        {
            name: 'blek! Bin',
            source: 'https://git.blek.codes/blek/bin',
            desc: 'Privacy-respecting, js-free alternative to Pastebin. Inspired by Librebin.'
        },
        {
            name: 'College project',
            source: '#',
            desc: 'Work in progress. Planned to be a site with rental apartments for students'
        }
    ]
}

const skills = {
    web: (
        <pre>
            <Title>My web experience</Title>
            <p>
                Most of my web projects are listed on <a href='https://github.com/b1ek'>GitHub</a>.<br/>
                I like Express.JS and Laravel, but also want to try Rust.<br/>
                <br/>
                On frontend, i like to write no-js HTML using<br/>
                template engines, or use React for complex apps like this one.
            </p>
            <hr style={{margin:'10px 0'}}/>
            <p>
                My projects:
            </p>

            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Sources</th>
                        <th>Description</th>
                    </tr>

                    {
                        Object.keys(projects.web).map((key, i) => {
                            const proj = projects.web[key];
                            return (
                                <tr key={i}>
                                    <td>{proj.name}</td>
                                    <td>
                                        <a href={proj.source}>Link</a>
                                    </td>
                                    <td>{proj.desc}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </pre>
    ),
    nt: (
        <pre>
            <Title>My native dev experience</Title>
            <p>
                It isn't much.<br/>
                I have only one project that is made with Qt/C++: 
                <a href='https://github.com/b1ek/CuteSchedule'>CuteSchedule</a> 
                (Cute stands fot Qt).<br/>
                <br/>
                But I do have a lot of experience with C and C++, as I like to write
                a lot of programs in those languages in my free time. An example of these programs: 
                <a href='https://github.com/b1ek/f2bin'>f2bin</a>.
            </p>
        </pre>
    )
}

module.exports = (args) => {

    if (skills[args]) return skills[args];

    return (<pre>
        <Colored color='#00ffe7'>Web dev (PHP & JS)</Colored>
        <br/>
        [#####] 100%<br/>
        My main work field<br/>
        More: <Colored color='seagreen' weight='normal'>skills web</Colored><br/>
        <br/>

        <Colored color='#cc6a6a'>C/C++/Rust native dev</Colored><br/>
        [##   ] 40%<br/>
        I do this... sometimes<br/>
        <br/>

        <Colored color='#7dadd7'>Linux skills</Colored><br/>
        [#####] 100%<br/>
        Do this all the time. I run linux on my laptop, pc and server<br/>
        <br/>

        <Colored color='#2e8b7e'>Being cis</Colored><br/>
        [     ] 0%<br/>
        Never liked it<br/>
        <br/>
    </pre>)
}