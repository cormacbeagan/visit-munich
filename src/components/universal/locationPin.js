import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { GiMineralHeart } from 'react-icons/gi'

const LocationPin = props => {
    const { text, zoom, handleInfo, id, color } = props
    const [hover, setHover] = useState(false)
    const [pinSize, setPinSize] = useState(24)
    const toggleHover = () => {
        setHover(!hover)
    }
    const handleClick = e => {
        e.preventDefault()
        handleInfo(id)
    }

    useEffect(() => {
        setPinSize(zoom * 2.2)
    }, [zoom])

    const pin = {
        position: 'relative',
        height: pinSize + 'px',
        width: pinSize + 'px',
        cursor: 'pointer',
        color: color,
        transform: 'rotate(135deg)',
        transition: 'all 400ms ease-in',
    }

    const hoverPin = {
        position: 'relative',
        zIndex: '100',
        height: pinSize + 'px',
        width: pinSize + 'px',
        cursor: 'pointer',
        color: color,
        transform: 'scale(1.3) rotate(0deg)',
        transition: 'all 400ms ease-out',
    }

    const pinIcon = {
        height: 'auto',
        width: pinSize + 'px',
    }

    return (
        <div
            id='locationPin'
            style={hover ? hoverPin : pin}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
        >
            <GiMineralHeart
                onTouchEnd={handleClick}
                onClick={handleClick}
                style={pinIcon}
            />
        </div>
    )
}

LocationPin.propTypes = {
    color: PropTypes.string,
    handleInfo: PropTypes.func,
    id: PropTypes.any.isRequired,
    text: PropTypes.string,
    zoom: PropTypes.number,
}

export default LocationPin
