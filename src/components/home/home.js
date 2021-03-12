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
import {
  Container,
  BoxCont,
  ScrollBoxStyle,
  LogoDiv,
  BoxDiv,
} from '../Styles/HomeStyles';

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
      const orderedBlogs = Array.from(blogs);
      orderedBlogs.sort((a, b) => (a.rank < b.rank ? -1 : 1));
      setBlogArray(orderedBlogs);
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

  return (
    <Container height={height} width={width}>
      <DateForm name={'pick your dates'} handleDates={handleDates} />
      <LogoDiv>
        <h1>Visit Munich</h1>
      </LogoDiv>
      <BoxCont slideIn={slideIn}>
        <BoxSlider>
          <BoxDiv>
            <ScrollBoxStyle scrollWidth={scrollWidth} ref={scrollDiv}>
              {concertScroll[0] && <ScrollBox data={concertScroll} />}
              {weatherScroll[0] && <ScrollBox data={weatherScroll} />}
            </ScrollBoxStyle>
            {blogArray.map(blog => {
              return (
                <BoxWrapper key={blog.id}>
                  <HomeEntry data={blog} url={'/editblog'} />
                </BoxWrapper>
              );
            })}
          </BoxDiv>
        </BoxSlider>
      </BoxCont>
    </Container>
  );
}
