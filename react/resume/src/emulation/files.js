const Hi = (props) => {
    return <span style={{color:'seagreen',fontWeight:'bold'}}>{...props.children}</span>
}

module.exports = {
    'about.txt': <>
    Hi! This is my online resume.
    <br/>
    You can browse files with <Hi>ls</Hi>, and read them with <Hi>cat</Hi>.
    </>,
    'super_secret_password.txt':
        <span style={{color:'orange',fontWeight:'bold'}}>uwu</span>
}