import React, { useRef, useEffect, useState } from 'react'
import '../../styles/boxSlider.css'


function BoxSlider({children}) {
    const [ classSlider, setClassSlider ] = useState('box-slider')
    const slider = useRef()
    let isDown = false;
    let startX;
    let scrollLeft = 0;
    const handleDown = (e) => {
        isDown = true;
        setClassSlider('box-slider active')
        startX = e.pageX - slider.current.offsetLeft;
        scrollLeft = slider.current.scrollLeft
    }

    const handleUp = () => {
        isDown = false;
        setClassSlider('box-slider')
    }

    const handleMove = (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX -slider.current.offsetLeft;
        const walk = x - startX;
        slider.current.scrollLeft = scrollLeft - walk;
    }

    useEffect(() => {
        const slideSet = slider.current
        slideSet.addEventListener('mousedown', handleDown);
        slideSet.addEventListener('mouseup', handleUp);
        slideSet.addEventListener('mouseleave', handleUp)
        slideSet.addEventListener('mousemove', handleMove)
        return () => {
            slideSet.removeEventListener('mousedown', handleDown)
            slideSet.removeEventListener('mouseup', handleUp)
            slideSet.removeEventListener('mouseleave', handleUp)
            slideSet.removeEventListener('mousemove', handleMove)
        }
    }, [])

    useEffect(() => {
        const slideSet = slider.current
        slideSet.scrollLeft = 0;
        return () => {
            slideSet.scrollLeft = 0;    
        }
    }, [children])

    return (
        <div className={classSlider} ref={slider}>
            <div className='slider-inner'>
                {children}
            </div>
        </div>
    )
}

export default BoxSlider;