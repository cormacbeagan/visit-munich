import PropTypes from 'prop-types'

function Closer({ onClick }) {
    return (
        <div style={closerStyle} onClick={onClick} aria-label='closer'>
            <div style={xCloser}></div>
            <div style={yCloser}></div>
        </div>
    )
}

Closer.propTypes = {
    onClick: PropTypes.func,
}

export default Closer

const closerStyle = {
    cursor: 'pointer',
    position: 'absolute',
    width: '50px',
    height: '50px',
    top: '10px',
    left: '10px',
    background: 'rgba(0,0,0,0.3)',
    boxShadow: '0 0 5px 8px rgba(0,0,0,0.2)',
    transform: 'scale(0.65)',
    zIndex: '1',
}

const xCloser = {
    position: 'absolute',
    top: '-18.5px',
    left: '18.5px',
    width: '50px',
    height: '50px',
    borderBottom: '4px solid #eadcdc',
    transform: 'rotate(45deg)',
}

const yCloser = {
    position: 'absolute',
    top: '-18.5px',
    left: '-18.5px',
    width: '50px',
    height: '50px',
    borderBottom: '4px solid #eadcdc',
    transform: 'rotate(-45deg)',
}
