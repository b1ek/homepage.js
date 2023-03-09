module.exports = (p) => {
    return <span style={{color: p.color, fontWeight: 'bold'}}>{...p.children}</span>
}