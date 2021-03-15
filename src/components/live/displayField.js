import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../universal/button';
import ExtLink from '../universal/ExtLink';
import LogoLink from '../universal/LogoLink';

const BoxText = styled.div`
  margin: 10px;
  max-width: 220px;
  color: var(--white);
  h1 {
    color: var(--lightPink);
    font-size: 22px;
    margin: 8px 0;
    word-break: break-word;
  }

  p {
    margin: 0;
    font-weight: bold;
    color: var(--darkBlue);
  }
`;

const LogoDiv = styled.div`
  position: absolute;
  top: 60px;
  right: 10px;
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
          <LogoDiv>
            <LogoLink href={displayData.uri} size={30}>
              <img src="/images/sk-badge-pink.png" alt="" />
              <p className="accessibly-hidden">
                Songkick website venue details
              </p>
            </LogoLink>
          </LogoDiv>
          <BottomDiv>
            <Button
              children={'concerts'}
              onClick={() => handleVenue(displayData.coords, displayData.name)}
            />
            <ExtLink
              href={`https://www.google.com/maps/search/?api=1&query=${displayData.lat},${displayData.lng}`}
            >
              directions
            </ExtLink>
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
