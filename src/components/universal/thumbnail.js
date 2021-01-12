import React from 'react';

function Thumbnail(props) {
    const { src } = props
    return (
        <img 
            style={thumbStyle}
            src={src} 
            alt="Thumbnail"
            />
    )
}

export default Thumbnail;

const thumbStyle = {
    width: '80px', 
    height: '80px', 
    overflow: 'hidden', 
    margin: '5px'
}