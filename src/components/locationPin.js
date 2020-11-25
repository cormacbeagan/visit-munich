import React, { useState } from 'react';
import {GiMineralHeart} from 'react-icons/gi';
import '../styles/locationPin.css'

const LocationPin = ({ text, handleInfo, id }) => {
    const [ hover, setHover ] = useState(false)

    const toggleHover = () => {
        setHover(!hover)
    }
    const handleClick = () => {
        console.log(id)
        handleInfo(id)
    }
    return (
        <div 
        style={pin}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}>
            <GiMineralHeart
                onClick={handleClick}
                style={hover ? pinIconHover : pinIcon} />
        </div>
    )
}

const pin = {
    cursor: 'pointer',
    color: '#b81b16',
};

const pinIcon = {
    height: 'auto',
    width: '24px',
    transition: 'all 1s ease-in',
};

const pinIconHover = {
    height: 'auto',
    width: '45px',
    transition: 'all 0.7s ease-out',
}



export default LocationPin;


