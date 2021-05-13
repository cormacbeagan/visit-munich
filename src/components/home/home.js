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

import pdfData from './summaryData.json';
import generatePDF from 'trauma-report-pdf-mac';

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

  //* pdf generation
  const download = useRef();
  const pdfGen = async () => {
    const resp = await fetch(
      'https://nesturastraumapdfgeneratordev.azurewebsites.net',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pdfData),
      }
    );
    console.log(resp);
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    download.current.href = url;
  };
  const pdfGenLocal = async () => {
    const resp = await fetch('http://localhost:8080', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pdfData),
    });
    console.log(resp);
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    download.current.href = url;
  };

  const inPdfGen = async () => {
    const resp = generatePDF(pdfData, true);
    console.log(resp);
    const blob = new Blob([resp], { type: 'application/pdf' });
    console.log(blob);
    const url = URL.createObjectURL(blob);
    download.current.href = url;
  };

  return (
    <Container height={height} width={width}>
      <DateForm name={'pick your dates'} handleDates={handleDates} />
      <LogoDiv>
        {/* //* pdf generation */}
        <button
          style={{ background: 'white', margin: '50px', padding: '10px' }}
          onClick={pdfGen}
        >
          PDF
        </button>
        <button
          style={{ background: 'white', margin: '50px', padding: '10px' }}
          onClick={inPdfGen}
        >
          PDF In
        </button>
        <button
          style={{ background: 'white', margin: '50px', padding: '10px' }}
          onClick={pdfGenLocal}
        >
          PDF Local
        </button>
        <a
          ref={download}
          href=""
          target="_blank"
          // download
          style={{
            background: 'white',
            fontSize: '16px',
            color: 'black',
            padding: '10px',
          }}
        >
          Download
        </a>
        {/* //* pdf generation */}

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
