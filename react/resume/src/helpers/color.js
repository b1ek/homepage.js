module.exports = (p) => {
    return <span style={{color: p.color, fontWeight: (p.weight ? p.weight : 'bold')}}>{...p.children}</span>
}