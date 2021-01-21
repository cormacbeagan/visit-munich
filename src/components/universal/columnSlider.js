import React, { useRef, useEffect, useState } from 'react'
import '../../styles/boxSlider.css'


function ColumnSlider({children}) {
    const [ classSlider, setClassSlider ] = useState('box-slider column')
    const slider = useRef()
    let isDown = false;
    let startY;
    let scrollTop = 0;
    const handleDown = (e) => {
        isDown = true;
        setClassSlider('box-slider column active')
        startY = e.pageY - slider.current.offsetTop;
        scrollTop = slider.current.scrollTop
    }

    const handleUp = () => {
        isDown = false;
        setClassSlider('box-slider column')
    }

    const handleMove = (e) => {
        if(!isDown) return;
        e.preventDefault();
        const y = e.pageY -slider.current.offsetTop;
        const walk = y - startY;
        slider.current.scrollTop = scrollTop - walk;
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

    return (
        <div className={classSlider} ref={slider}>
            <div className='slider-inner column'>
                {children}
            </div>
        </div>
    )
}

export default ColumnSlider;