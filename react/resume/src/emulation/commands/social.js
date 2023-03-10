import Color from '../../helpers/color';
const Link = (prop) => {
    return <a href={prop.href} style={{color:'lightblue',textDecoration:'none',fontWeight:'bold'}}>{...prop.children}</a>
}

module.exports = () => {
    return <p>
        My socials are listed below:<br/>
        <br/>
        {'>'} <Link href='https://blek.codes'>My website</Link><br/>
        {'>'} <Link href='https://github.com/b1ek'>Github page</Link><br/>
        {'>'} <Link href='https://git.blek.codes/b1ek'>Gitea page</Link><br/>
        {'>'} <Link href='mailto:me@blek.codes'>Email</Link><br/>
        {'>'} <Link href='https://t.me/bleki42'>Telegram</Link><br/>
        <Color color='gray' weight='default'>(all links are clickable)</Color>
    </p>;
}