import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward} from 'react-icons/fa';
import '../../styles/carousel.css';
let imageArray = [];



function Slide({ image, isCurrent, label, click }) {
    return (
        <img
            className='slide'
            aria-hidden={!isCurrent}
            aria-labelledby={label}
            src={image}
            onClick={click}
        />
    )
}


function Controls(props) {
    return <div className='controls' {...props} />
}

function ControlButton(props) {
    return <button className='controlButton' {...props} />
}

function Carousel(props) {
    const { display, closeModal, data} = props
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const [ isPlaying, setIsPlaying ] = useState(false)
    const ref = useRef()

    useEffect(() => {
        let counter = 0
        if(data.images){
            imageArray = data.images.map(image => {
                const indexedImage = {
                    index: counter,
                    image: image,
                }
                counter ++;
                return indexedImage
            })
        }
    }, [data])

    useEffect(() => {
        let timeout
        if(isPlaying) {
            timeout = setTimeout(() => {
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
           <div className='carousel-container' style={display}>
            <div className='closer' onClick={handleCloser}></div>
            <div ref={ref} className=''>
                {imageArray.map(item => {
                    return (
                      <Slide
                        key={item.index}
                        image={item.image}
                        label={`image-${item.index}`}
                        isCurrent={item.index === currentIndex}
                        click={handleForward}
                      />
                )
            })}
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


export default Carousel

