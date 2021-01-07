import React, { useState, useEffect} from 'react';
import Carousel from './carousel';
import '../../styles/displayImage.css';

function DisplayImage({ data }) {
    const [ display, setDisplay ] = useState({display: 'none'})

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
                className='imageDiv'
                >
                <img className='imageStyle' src={data.image} alt="Wall Thumbnail"/>
            </div>
        </div>
        )
}


export default DisplayImage;

