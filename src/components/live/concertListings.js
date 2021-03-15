import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Concert from './concert';

const ContDiv = styled.div`
  margin-top: 180px;
  h1 {
    font-size: 3.5rem;
    text-align: center;
    color: var(--white);
  }
`;
const ContainerStyle = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px 0;
  background: var(--darkBrown);
`;

export default function ConcertListings(props) {
  const { handleBackToMap, coords, venue } = props;
  const concerts = useSelector(state => state.concerts);
  let concertArray;
  if (coords) {
    concertArray = concerts.events.filter(
      concert => `${concert.venue.lat}${concert.venue.lng}` === coords
    );
  } else {
    concertArray = concerts.events;
  }

  const handleBack = id => {
    const event = concerts.events.filter(item => item.id === id);
    handleBackToMap(event[0]);
  };

  return (
    <ContDiv>
      {venue ? (
        <h1>All concerts for {venue}</h1>
      ) : (
        <h1>All concerts for your dates</h1>
      )}
      <ContainerStyle>
        <div>
          {concertArray.map(event => {
            if (!event) {
              return null;
            } else {
              return (
                <div key={event.id}>
                  <Concert handleBackToMap={handleBack} data={event} />
                </div>
              );
            }
          })}
        </div>
      </ContainerStyle>
    </ContDiv>
  );
}

ConcertListings.propTypes = {
  coords: PropTypes.any,
  handleBackToMap: PropTypes.func,
};
