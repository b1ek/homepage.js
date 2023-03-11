const Hi = (props) => {
    return <span style={{color:'seagreen',fontWeight:'bold'}}>{...props.children}</span>
}
const HR = () => {
    return <hr style={{margin:'16px 0'}}/>;
}

module.exports = {
    'README.md': <>
    <h1># Hello there!</h1>
    <HR />
    My name is Alice and I am a fullstack web developer.<br/>
    I am a trans girl and I live in Russia.<br/>
    <br/>
    This app was built with <Hi>React.JS</Hi> and <Hi>Parcel</Hi>.<br/>

    <h2>## About me</h2>
    <HR />
    I am <Hi>vegan</Hi> and like to listen to hyperpop/jpop.
    Though being <Hi>vegan</Hi>, I do eat fried chicken occasionally.<br/>
    <br/>
    I honestly believe that governments are spying on us
    every time they get a chance to, which is always.
    This is why I run <Hi>linux</Hi> and use little to none of proprietary
    software, all my connections are proxied through an offshore server
    and I don't use <Hi>The Internet</Hi> when I don't have to.<br/>
    <br/>
    I like <Hi>PHP+JS</Hi> and <Hi>C</Hi>. I use <Hi>PHP+JS</Hi> for work and <Hi>C</Hi> for passion projects,
    as I find it too much of work and possible memory leaks and a lot of nasty
    stuff. To be honestly, I don't imagine building a site or an IDE using just <Hi>C</Hi>.
    Perhaps, if speed is very much important, I would look into <Hi>C++</Hi>, <Hi>Rust</Hi> or <Hi>Go</Hi>.<br/>
    <br/>
    Also I have some experience with stuff like <Hi>Arduino</Hi> and/or <Hi>Raspberry Pi</Hi>. 
    I used to have a team of other makers and we tried to build a vending machine on a bunch of Arduinos and one <s>Raspberry</s> Orange Pi.<br/>
    <br/>
    Read this app's source code
    on <a href='https://git.blek.codes/blek/homepage.js/src/branch/master/react/resume'>Gitea </a>
    or <a href='https://github.com/b1ek/homepage.js/tree/master/react/resume'>Github</a>
    </>,

    'super_secret_password.txt':
        <h1 style={{color:'gray',fontWeight:'bold'}}>UwU</h1>,
}