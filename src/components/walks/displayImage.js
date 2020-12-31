import React, { useState, useEffect, Fragment } from 'react';
import Carousel from './carousel';
import '../../styles/displayImage.css';
const munImage = '/images/IMG_20180330_174450.jpg';
//const munImage = '/wp-content/plugins/react-visit/visit/build/images/munich-1480740_1920.jpg';

function DisplayImage({ data }) {
    const [ display, setDisplay ] = useState({display: 'none'})

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
                    closeModal={closeModal}
                    data={data}
                    display={display}/>
            </div>
            <div onClick={handleModal} 
                className='imageDiv'
                style={{backgroundImage: `url(${munImage})`}}>
                <img className='imageStyle' src={data.image}/>
            </div>
        </div>
        )
}



export default DisplayImage;

