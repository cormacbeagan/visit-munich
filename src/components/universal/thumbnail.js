import React from 'react';

function Thumbnail(props) {
    const { src } = props
    return (
        <img 
            style={{width: '80px', height: '80px', overflow: 'hidden', margin: '5px'}}
            src={src} 
            alt="Thumbnail"
            />
    )
}

export default Thumbnail;