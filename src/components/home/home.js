import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useDimensionSetter } from '../../hooks/useDimensionSetter';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { setDates } from '../../store/actions/dateActions';
import { concertSearch } from '../../store/actions/concertActions';
import { weatherSearch } from '../../store/actions/weatherActions';
import DateForm from '../universal/dateForm';
import BoxSlider from '../universal/boxSlider';
import ScrollBox from './scrollBox';
import BoxWrapper from '../universal/boxWrapper';
import HomeEntry from './homeEntry';

export default function Home() {
  const [width, height] = useDimensionSetter();
  const [slideIn, setSlideIn] = useState(width);
  const [blogArray, setBlogArray] = useState([]);
  const [weatherScroll, setWeatherScroll] = useState([]);
  const [concertScroll, setConcertScroll] = useState([]);
  const [scrollWidth, setScrollWidth] = useState(0);
  const scrollDiv = useRef();
  const dispatch = useDispatch();
  useFirestoreConnect(['blogs']);
  const blogs = useSelector(state => state.firestore.ordered?.blogs);
  const weather = useSelector(state =>
    state.weather.type ? false : state.weather.weather
  );
  const concerts = useSelector(state => state.concerts);

  useEffect(() => {
    if (blogs) {
      setBlogArray(blogs);
    }
  }, [blogs]);
  useEffect(() => {
    setSlideIn('0');
  }, []);

  useEffect(() => {
    let tester = scrollWidth;
    if (weather) {
      setWeatherScroll(weather);
      if (scrollWidth < 600) {
        setScrollWidth(scrollWidth + 326);
        tester += 326;
      }
    }
    if (concerts.events.length !== 0) {
      setConcertScroll(concerts.events);
      if (tester < 600) {
        setScrollWidth(tester + 326);
      }
    }
  }, [concerts, weather]);

  const handleDates = dates => {
    dispatch(setDates(dates));
    dispatch(concertSearch(dates));
    dispatch(weatherSearch(dates));
  };

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
  };

  const boxContainer = {
    position: 'absolute',
    width: '100%',
    left: slideIn,
    bottom: '0px',
    display: 'flex',
    flexDirection: 'row',
    transition: 'left 3s ease',
  };

  const scrollBoxStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: scrollWidth + 'px',
    transition: 'all 500ms cubic-bezier(0.77, 2.05, 0.72, 0.75)',
  };

  return (
    <section style={container}>
      <DateForm name={'pick your dates'} handleDates={handleDates} />
      <div style={logo}>
        <h1 className="home-heading">Visit Munich</h1>
      </div>
      <div style={boxContainer}>
        <BoxSlider>
          <div style={boxDiv}>
            <div style={scrollBoxStyle} ref={scrollDiv}>
              {concertScroll[0] && <ScrollBox data={concertScroll} />}
              {weatherScroll[0] && <ScrollBox data={weatherScroll} />}
            </div>
            {blogArray.map(blog => {
              return (
                <BoxWrapper key={blog.id}>
                  <HomeEntry data={blog} url={'/editblog'} />
                </BoxWrapper>
              );
            })}
          </div>
        </BoxSlider>
      </div>
    </section>
  );
}

const logo = {
  margin: '200px 25px',
  fontSize: '36px',
  color: 'white',
};

const boxDiv = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
};
