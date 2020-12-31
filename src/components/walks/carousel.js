import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward} from 'react-icons/fa';
import { imageArray } from './mapData'; // this needs to be changed to an 
// array which will be delivered from the store with each project
import '../../styles/carousel.css';

function Slide({ image, isCurrent, id, }) {
    return (
        <img
            className='slide'
            aria-hidden={!isCurrent}
            aria-labelledby={id}
            src={image}
        />
    )
}


function Controls(props) {
    return <div className='controls' {...props} />
}

function ControlButton(props) {
    return <button className='controlButton' {...props} />
}

function Carousel({ display, closeModal }) {
    const [ currentIndex, setCurrentIndex ] = useState(2)
    const [ isPlaying, setIsPlaying ] = useState(false)
    const ref = useRef()

    useEffect(() => {
        let timeout
        if(isPlaying) {
            timeout = setTimeout(() => {
                console.log(isPlaying)
                setCurrentIndex((currentIndex + 1) % imageArray.length)
            }, 3000)
        }
        return () => clearTimeout(timeout)
    })

    const handleClick = () => {
          setIsPlaying(!isPlaying)
    }

    const handleBack = () => {
            setCurrentIndex((currentIndex -1 + imageArray.length) % imageArray.length)      
    }
    
    const handleForward = () => {
            setCurrentIndex((currentIndex + 1) % imageArray.length)
    }

    const handleCloser = () => {
        ref.current.className='slideOut'
        setTimeout(() => {
            closeModal()
            ref.current.className=''
        }, 300)
    }
   
    return (
        <div className='container' style={display}>
            <div className='closer' onClick={handleCloser}></div>
            <div ref={ref} className=''>
                {imageArray.map(item => (
                <Slide
                    key={item.index}
                    id={`image-${item.index}`}
                    image={item.image}
                    isCurrent={item.index === currentIndex}
                />
            ))}
            </div>
            <Controls>
                {isPlaying ? (
                <ControlButton
                    onClick={handleClick}
                    aria-label='Pause'
                    children={<FaPause/>}
                />
                ) : (
                <ControlButton
                    onClick={handleClick}
                    aria-label='Play'
                    children={<FaPlay/>}
                />
                )}
                <ControlButton
                    onClick={handleBack}
                    aria-label='Forward'
                    children={<FaBackward/>}
                />
                <ControlButton
                    onClick={handleForward}
                    aria-label='Backward'
                    children={<FaForward/>}
                />
            </Controls>
    </div>
    )
}

export default Carousel;