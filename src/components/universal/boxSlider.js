import React, { useRef, useEffect, useState } from 'react'
import '../../styles/boxSlider.css'


function BoxSlider({children}) {
    const [ classSlider, setClassSlider ] = useState('box-slider')
    const slider = useRef()
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleDown = (e) => {
        console.log(e)
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
        slider.current.addEventListener('mousedown', handleDown);
        slider.current.addEventListener('mouseup', handleUp);
        slider.current.addEventListener('mouseleave', handleUp)
        slider.current.addEventListener('mousemove', handleMove)
        return () => {
            slider.current.removeEventListener('mousedown', handleDown)
            slider.current.removeEventListener('mouseup', handleUp)
            slider.current.removeEventListener('mouseleave', handleUp)
            slider.current.removeEventListener('mousemove', handleMove)
        }
    }, [])






    return (
        <div className={classSlider} ref={slider}>
            <div className='slider-inner'>
                {children}
            </div>
        </div>
    )
}

export default BoxSlider;