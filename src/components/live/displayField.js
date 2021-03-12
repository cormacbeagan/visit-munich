import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import styled from 'styled-components';
import Button from '../universal/button';

const BoxText = styled.div`
  margin: 10px;
  color: var(--white);
  h1 {
    color: var(--darkBlue);
    font-size: 22px;
    margin: 8px 0;
  }
  p {
    margin: 0;
    font-weight: bold;
    color: var(--lightPink);
  }
`;

const LogoStyle = styled.img`
  height: 25px;
  width: 25px;
  position: absolute;
  top: 60px;
  right: 30px;
  cursor: pointer;
`;

const BandFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  p {
    color: var(--white);
  }
`;

const BottomDiv = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
`;

function DisplayField(props) {
  const { data, handleVenue, bands } = props;
  const [displayData, setDisplayData] = useState();
  const link = useRef();
  useEffect(() => {
    setDisplayData(data[0]);
  }, [data]);

  if (displayData) {
    return (
      <BoxText>
        <h1>{displayData.name}</h1>
        {bands && (
          <div>
            <p>Bands: </p>
            <BandFlex>
              {bands.map(band => {
                return <p key={band}>{band},</p>;
              })}
            </BandFlex>
          </div>
        )}

        <div>
          <br />
          <a href={displayData.uri} target="_blank" rel="noreferrer">
            <LogoStyle src="/images/sk-badge-pink.png" alt="" />
            <p className="accessibly-hidden">Songkick website</p>
          </a>
          <BottomDiv>
            <Button
              children={'concerts'}
              onClick={() => handleVenue(displayData.coords)}
            />
            <Button
              children={
                <div>
                  directions <FiExternalLink style={{ marginBottom: '-2px' }} />
                  <a
                    ref={link}
                    href={`https://www.google.com/maps/search/?api=1&query=${displayData.lat},${displayData.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="accessibly-hidden"
                  >
                    Google Maps
                  </a>
                </div>
              }
              onClick={() => link.current.click()}
            />
          </BottomDiv>
        </div>
      </BoxText>
    );
  } else {
    return null;
  }
}

DisplayField.propTypes = {
  bands: PropTypes.array,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  handleVenue: PropTypes.func,
};

export default DisplayField;
