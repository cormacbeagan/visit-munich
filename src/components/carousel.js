import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward} from 'react-icons/fa';
import { imageArray } from './mapData';
import '../styles/carousel.css';



/*
//for wordpress
const imageArray = [
    {image: '/wp-content/plugins/react-visit/visit/build/images/schlachthof4-hp.jpg', index: 0},
    {image: '/wp-content/plugins/react-visit/visit/build/images/Eagle Grafiti 1024px.jpg', index: 1},
    {image: '/wp-content/plugins/react-visit/visit/build/images/IMG_20180330_220107.jpg', index: 2},
    {image: '/wp-content/plugins/react-visit/visit/build/images/Brüdermuhl Grafiti 1024px.jpg', index: 3},
]
*/
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