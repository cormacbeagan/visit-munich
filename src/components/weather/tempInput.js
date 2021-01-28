import PropTypes from 'prop-types'
import { WiCelsius } from 'react-icons/wi'

function TempInput({ avg, min, max }) {
    const tempColor = temp => {
        if (temp < 0) {
            return '#78c1ff'
        } else if (temp < 8) {
            return '#4ca8f7'
        } else if (temp < 14) {
            return '#dfbaaa'
        } else if (temp < 22) {
            return '#f5b72d'
        } else if (temp < 28) {
            return '#f16940'
        } else {
            return 'red'
        }
    }

    return (
        <div style={temps}>
            <div style={tempBox}>
                <p style={box}>Min </p>
                <p style={{ ...box, color: tempColor(min) }}>
                    {min}
                    <WiCelsius style={symbolStyle} />
                </p>
            </div>
            <div style={tempBox}>
                <p style={box}>Ø </p>
                <p style={{ ...box, color: tempColor(avg) }}>
                    {avg}
                    <WiCelsius style={symbolStyle} />
                </p>
            </div>
            <div style={tempBox}>
                <p style={box}>Max </p>
                <p style={{ ...box, color: tempColor(max) }}>
                    {max}
                    <WiCelsius style={symbolStyle} />
                </p>
            </div>
        </div>
    )
}

TempInput.propTypes = {
    avg: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
}

export default TempInput

const box = {
    margin: '2px',
    color: '#bebdc0',
    fontSize: '18px',
}

const temps = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
}

const tempBox = {
    margin: '10px',
}

const symbolStyle = {
    width: '22px',
    height: '22px',
    transform: 'scale(1.4)',
}
