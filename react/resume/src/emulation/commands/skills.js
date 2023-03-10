import Colored from '../../helpers/color';

const Title = (p) => {return <h3 style={{margin:'16px 0', color: '#526b93'}}>{...p.children}</h3>}

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
                        <td>Name</td>
                        <td>Sources</td>
                        <td>Description</td>
                    </tr>

                    <tr>
                        <td>blek! Site</td>
                        <td>
                            <a href='https://github.com/b1ek/blekSite'>Link</a>
                        </td>
                        <td>Second re write of my website in Laravel</td>
                    </tr>

                    <tr>
                        <td>homepage.js</td>
                        <td>
                            <a href='https://git.blek.codes/blek/homepage.js'>Link</a>
                        </td>
                        <td>Third re write of my website in JS/Express.JS/Pug and some other libraries</td>
                    </tr>
                </tbody>
            </table>
        </pre>
    ),
    nt: (
        <pre>
            <Title>My native dev experience</Title>
            <p>
                It isn't much
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