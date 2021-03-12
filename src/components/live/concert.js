import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Button from '../universal/button';
import { useDimensionSetter } from '../../hooks/useDimensionSetter';
import { FiExternalLink } from 'react-icons/fi';
import styled from 'styled-components';
dayjs.extend(advancedFormat);

const Container = styled.article`
  background-color: var(--middleBrown);
  min-height: 80px;
  width: 76%;
  margin: 20px auto;
  padding: ${props => (props.width < 800 ? '20px' : '40px')};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  color: var(--white);
  border-radius: 5px;
  h2 {
    margin: 0;
    color: var(--lightPink);
  }
  h3 {
    color: var(--lightPink);
  }
  p {
    color: var(--lightPink);
    margin: 2px 0;
    font-weight: 600;
    font-size: 18px;
  }
  span {
    color: var(--white);
  }
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LogoImg = styled.img`
  margin: 0 8px;
  cursor: pointer;
  height: 20px;
  width: 20px;
`;

const SkButton = styled.img`
  left: 20px;
  height: 25px;
  width: 75px;
  cursor: pointer;
`;

const BtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const BandDiv = styled.div`
  margin-left: 10px;
`;

const LinkStyle = styled.div`
  color: var(--offWhite);
  width: 95px;
  max-height: 18px;
  overflow: hidden;
`;

function Concert(props) {
  const { data, handleBackToMap } = props;
  const [hover, setHover] = useState(false);
  const [width, height] = useDimensionSetter();
  const link = useRef();

  const handleBack = () => {
    handleBackToMap(data.id);
  };

  return (
    <Container width={width}>
      <h2>
        {dayjs(data.start.dateTime || data.start.date).format(
          'ddd Do MMM YYYY'
        )}
      </h2>
      <h3>
        Name: <span>{data.displayName.replace(/ *\([^)]*\) */g, '')}</span>
      </h3>
      <p>
        Venue: <span>{data.venue.displayName}</span>
      </p>
      {data.status !== 'ok' && (
        <p>
          Status: <span>{data.status}</span>
        </p>
      )}
      <FlexDiv>
        <p>Bands: </p>
        {data.performance.map(band => {
          return (
            <BandDiv key={band.id}>
              <FlexDiv>
                <p>
                  <span>{band.displayName}</span>
                </p>
                <a href={band.artist.uri} target="_blank" rel="noreferrer">
                  <LogoImg src="/images/sk-badge-pink.png" alt="" />
                  <p className="accessibly-hidden">
                    Songkick events details page
                  </p>
                </a>
                <a
                  href={`https://open.spotify.com/search/${band.displayName}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LogoImg src="/images/Spotify_Icon_RGB_Green.png" alt="" />
                  <p className="accessibly-hidden">Spotify artists page</p>
                </a>
              </FlexDiv>
            </BandDiv>
          );
        })}
      </FlexDiv>
      <BtnDiv>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onMouseOut={() => setHover(false)}
        >
          <Button
            children={
              <LinkStyle>
                {!hover ? (
                  <div>
                    Details <FiExternalLink style={{ marginBottom: '-2px' }} />
                  </div>
                ) : (
                  <SkButton src="/images/by-songkick-pink.svg" alt="" />
                )}
                <a
                  href={data.uri}
                  ref={link}
                  target="_blank"
                  rel="noreferrer"
                  className="accessibly-hidden"
                >
                  Songkick details page
                </a>
              </LinkStyle>
            }
            onClick={() => link.current.click()}
          />
        </div>
        <Button onClick={handleBack} children={'Back'} />
      </BtnDiv>
    </Container>
  );
}

Concert.propTypes = {
  data: PropTypes.object,
  handleBackToMap: PropTypes.func,
};

export default Concert;
