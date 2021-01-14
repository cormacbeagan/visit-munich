import React, { useState } from 'react';
import {GiMineralHeart, GiScaleMail} from 'react-icons/gi';

const LocationPin = ({ text, handleInfo, id }) => {
    const [ hover, setHover ] = useState(false)

    const toggleHover = () => {
        setHover(!hover)
    }
    const handleClick = (e) => {
        e.preventDefault()
        handleInfo(id)
    }
    
    return (
        <div 
            onTouchEnd={handleClick}
            onClick={handleClick}
            style={hover ? hoverPin : pin}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}>
                
                <GiMineralHeart
                    style={pinIcon} />
                
        </div>
    )
}

//{hover && text}

const pin = {
    height: '25px',
    width: '25px',
    cursor: 'pointer',
    color: '#b81b16',
    transform: 'rotate(135deg)',
    transition: 'all 1s ease-in',

};

const hoverPin = {
    height: '25px',
    width: '25px',
    cursor: 'pointer',
    color: '#b81b16',
    transform: 'scale(1.5) rotate(0deg)',
    transition: 'all 0.7s ease-out',
}

const pinIcon = {
    height: 'auto',
    width: '24px',
};

export default LocationPin;

