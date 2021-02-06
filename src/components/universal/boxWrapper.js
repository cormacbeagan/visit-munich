function BoxWrapper({ children }) {
    return (
        <article style={displayDiv} tabIndex='0'>
            {children}
        </article>
    )
}

export default BoxWrapper

const displayDiv = {
    position: 'relative',
    height: '300px',
    width: '300px',
    minWidth: '300px',
    margin: '10px',
    backgroundColor: '#51738aeb',
    borderRadius: '20px',
    border: '3px solid #395f78',
    boxShadow: '0 0 40px rgba(0, 0, 0, 0.3)',
}
