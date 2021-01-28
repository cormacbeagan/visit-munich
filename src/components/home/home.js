import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import { useDimensionSetter } from '../../hooks/useDimensionSetter'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { setDates } from '../../store/actions/dateActions'
import { concertSearch } from '../../store/actions/concertActions'
import { weatherSearch } from '../../store/actions/weatherActions'
import DateForm from '../universal/dateForm'
import BoxSlider from '../universal/boxSlider'
import ScrollBox from './scrollBox'
import BoxWrapper from '../universal/boxWrapper'
import HomeEntry from './homeEntry'

function Home(props) {
    const {
        setDates,
        concertSearch,
        weatherSearch,
        blogs,
        concerts,
        weather,
    } = props
    const [width, height] = useDimensionSetter()
    const [slideIn, setSlideIn] = useState(width)
    const [blogArray, setBlogArray] = useState([])
    const [weatherScroll, setWeatherScroll] = useState([])
    const [concertScroll, setConcertScroll] = useState([])
    const [scrollWidth, setScrollWidth] = useState(0)
    const scrollDiv = useRef()

    useEffect(() => {
        if (blogs) {
            setBlogArray(blogs)
        }
    }, [blogs])
    useEffect(() => {
        setSlideIn('0')
    }, [])

    useEffect(() => {
        let tester = scrollWidth
        if (weather) {
            setWeatherScroll(weather)
            if (scrollWidth < 600) {
                setScrollWidth(scrollWidth + 326)
                tester += 326
            }
        }
        if (concerts.events.length !== 0) {
            setConcertScroll(concerts.events)
            if (tester < 600) {
                setScrollWidth(tester + 326)
            }
        }
    }, [concerts, weather])

    const handleDates = dates => {
        setDates(dates)
        concertSearch(dates)
        weatherSearch(dates)
    }

    const container = {
        height: height,
        width: width,
        position: 'absolute',
        top: '0',
        left: '0',
        overflow: 'hidden',
        backgroundImage: 'url(/images/munich-hills.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '20% 80%',
        backgroundSize: 'cover',
    }

    const boxContainer = {
        position: 'absolute',
        width: '100%',
        left: slideIn,
        bottom: '0px',
        display: 'flex',
        flexDirection: 'row',
        transition: 'left 3s ease',
    }

    const scrollBoxStyle = {
        display: 'flex',
        flexDirection: 'row',
        width: scrollWidth + 'px',
        transition: 'all 500ms cubic-bezier(0.77, 2.05, 0.72, 0.75)',
    }

    return (
        <div style={container}>
            <DateForm name={'pick your dates'} handleDates={handleDates} />
            <div style={logo}>
                <h1 className='home-heading'>Visit Munich</h1>
            </div>
            <div style={boxContainer}>
                <BoxSlider>
                    <div style={boxDiv}>
                        <div style={scrollBoxStyle} ref={scrollDiv}>
                            {concertScroll[0] && (
                                <ScrollBox data={concertScroll} />
                            )}
                            {weatherScroll[0] && (
                                <ScrollBox data={weatherScroll} />
                            )}
                        </div>
                        {blogArray.map(blog => {
                            return (
                                <BoxWrapper key={blog.id}>
                                    <HomeEntry data={blog} url={'/editblog'} />
                                </BoxWrapper>
                            )
                        })}
                    </div>
                </BoxSlider>
            </div>
        </div>
    )
}

Home.propTypes = {
    blogs: PropTypes.array,
    concertSearch: PropTypes.func,
    concerts: PropTypes.shape({
        events: PropTypes.array,
        venues: PropTypes.array,
    }),
    setDates: PropTypes.func,
    weather: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    weatherSearch: PropTypes.func,
}

const mapStateToProps = state => {
    return {
        dates: state.dates,
        blogs: state.firestore.ordered.blogs || state.blogs.blogs,
        weather: state.weather.type ? false : state.weather.weather,
        concerts: state.concerts,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDates: dates => dispatch(setDates(dates)),
        concertSearch: dates => dispatch(concertSearch(dates)),
        weatherSearch: dates => dispatch(weatherSearch(dates)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'blogs', orderBy: ['rank'] }])
)(Home)

const logo = {
    margin: '200px 25px',
    fontSize: '36px',
    color: 'white',
}

const boxDiv = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
}
