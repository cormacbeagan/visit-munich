import React, { useState, useEffect} from 'react';
import Carousel from './carousel';

function DisplayImage({ data }) {
    const [ display, setDisplay ] = useState({display: 'none'})
    const [ hover, setHover ] = useState(false)
    useEffect(() => {
        //console.log(data.image)
    })

    const handleModal = () => {
        setDisplay({display: 'block'})
    }

    const closeModal = () => {
        setDisplay({display: 'none'})
    }

    return (
        <div>
            <div>
                <Carousel
                    id={data.id}
                    closeModal={closeModal}
                    data={data}
                    display={display}/>
            </div>
            <div onClick={handleModal} 
                style={imageDiv}
                >
                <img 
                    onMouseEnter={() => setHover(!hover)}
                    onMouseLeave={() => setHover(!hover)}
                    style={hover ? imageHoverStyle : imageStyle} 
                    src={data.image} 
                    alt="Wall Thumbnail"/>
            </div>
        </div>
        )
}

export default DisplayImage;

const imageDiv = {
    alignItems: 'center',
    width: '300px',
    height: '300px',
    overflow: 'hidden',
    background: 'grey',
    backgroundPosition: 'center center',
    backgroundSize: '305px 305px',
    bagroundRepeat: 'no-repeat',
}

const imageStyle = {
    height: '300px',
    width: '300px',
    objectFit: 'cover',
    transition: 'opacity 0.6s ease',
}

const imageHoverStyle = {
    height: '302px',
    width: '302px',
    objectFit: 'cover',
    transition: 'all 400ms ease',
    opacity: '0.75',
}

