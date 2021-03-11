import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Concert from './concert';

export default function ConcertListings(props) {
  const { handleBackToMap, coords } = props;
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
    <div style={containerStyle}>
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
    </div>
  );
}

ConcertListings.propTypes = {
  coords: PropTypes.any,
  handleBackToMap: PropTypes.func,
};

const containerStyle = {
  width: '100%',
  maxWidth: '1000px',
  margin: '50px auto',
  marginTop: '200px',
  padding: '20px 0px',
  backgroundColor: '#333333',
  color: '#f3f3f3',
  boxShadow: '0 100px 80px rgba(0, 0, 0, 0.3)',
};
