import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import StatsWeather from './statsWeather'
import Loading from '../universal/loading'
dayjs.extend(advancedFormat)

function WeatherData({ data }) {
    if (data) {
        return (
            <div style={boxText}>
                <h3 style={boxHeading}>
                    {dayjs(data.datetime).format('ddd Do MMM YYYY')}
                </h3>
                <div style={blur}>
                    <StatsWeather data={data} />
                </div>
            </div>
        )
    } else {
        return <Loading />
    }
}

WeatherData.propTypes = {
    data: PropTypes.object,
}

export default WeatherData

const boxText = {
    margin: '10px',
    color: 'white',
    contain: 'items',
}

const boxHeading = {
    color: '#cecbcb',
    textAlign: 'center',
}

const blur = {
    background: 'rgba(0,0,0, 0.4)',
    boxShadow: '0px 0px 20px 20px rgba(0,0,0, 0.4)',
    borderRadius: '20px',
}
