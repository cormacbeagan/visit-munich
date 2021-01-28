import PropTypes from 'prop-types'

function Thumbnail(props) {
    const { src } = props
    return <img style={thumbStyle} src={src} alt='Thumbnail' />
}

Thumbnail.propTypes = {
    src: PropTypes.string.isRequired,
}

export default Thumbnail

const thumbStyle = {
    width: '80px',
    height: '80px',
    overflow: 'hidden',
    margin: '4px',
}
