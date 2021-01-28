import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

function MoonPhase({ phase }) {
    const [leftBack, setLeftBack] = useState('0')
    const [backColor, setBackColor] = useState('black')
    const [frontColor, setFrontColor] = useState('white')

    useEffect(() => {
        if (phase <= 0.25) {
            setLeftBack(phase * 100)
        } else if (phase <= 0.5) {
            setBackColor('white')
            setFrontColor('black')
            const move = phase * 100 - 50
            setLeftBack(move - 50)
        } else if (phase <= 0.75) {
            setBackColor('white')
            setFrontColor('black')
            const move = (phase - 0.5) * 100
            setLeftBack(move)
        } else {
            const move = phase * 100 - 150
            setLeftBack(move)
        }
    })

    const moonFront = {
        left: '0',
        position: 'absolute',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: frontColor,
        overflow: 'hidden',
    }

    const moonBack = {
        top: '-25px',
        left: leftBack,
        position: 'absolute',
        width: '100px',
        height: '100px',
        borderRadius: '100%',
        background: backColor,
        overflow: 'hidden',
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={container}>
                <div style={moonFront}></div>
                <div style={moonBack}></div>
            </div>
        </div>
    )
}

MoonPhase.propTypes = {
    phase: PropTypes.number,
}

export default MoonPhase

const container = {
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: '100%',
    height: '50px',
    width: '50px',
    transform: 'rotate(10deg) scale(0.7)',
    background: 'black',
}
