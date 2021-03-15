import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Button from '../universal/button';
import { useDimensionSetter } from '../../hooks/useDimensionSetter';
import styled from 'styled-components';
import LogoLink from '../universal/LogoLink';
import ExtLink from '../universal/ExtLink';
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

const SkLogo = styled.img`
  position: absolute;
  right: 20px;
  bottom: -30px;
  height: 25px;
  width: 75px;
`;

const BtnDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const BandDiv = styled.div`
  margin-left: 10px;
`;

function Concert(props) {
  const { data, handleBackToMap } = props;
  const [width, height] = useDimensionSetter();

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
                <LogoLink href={band.artist.uri} size={25}>
                  <img src="/images/sk-badge-pink.png" alt="" />
                  <p className="accessibly-hidden">
                    Songkick events details page
                  </p>
                </LogoLink>
                <LogoLink
                  href={`https://open.spotify.com/search/${band.displayName}`}
                  size={25}
                >
                  <img src="/images/Spotify_Icon_RGB_Green.png" alt="" />
                  <p className="accessibly-hidden">Spotify artists page</p>
                </LogoLink>
              </FlexDiv>
            </BandDiv>
          );
        })}
      </FlexDiv>
      <BtnDiv>
        <Button onClick={handleBack} children={'Back'} />
        <ExtLink href={data.uri}>Details</ExtLink>
        <SkLogo src="/images/by-songkick-pink.svg" alt="" />
      </BtnDiv>
    </Container>
  );
}

Concert.propTypes = {
  data: PropTypes.object,
  handleBackToMap: PropTypes.func,
};

export default Concert;
