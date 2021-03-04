import axios from 'axios';

const songKickKey = process.env.REACT_APP_SONGKICK_API_KEY;
const munichId = '28549';

export const concertSearch = dates => {
  return (dispatch, getState) => {
    const arrival = new Date(
      dates.arrival.getTime() - dates.arrival.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0];
    const departure = new Date(
      dates.departure.getTime() - dates.departure.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0];
    const config = {
      method: 'get',
      url: `https://api.songkick.com/api/3.0/metro_areas/${munichId}/calendar.json?apikey=${songKickKey}&min_date=${arrival}&max_date=${departure}`,
    };
    axios(config)
      .then(resp => {
        const dataArray = resp.data.resultsPage.results.event;
        if (!dataArray) {
          dispatch({ type: 'CONCERT_SEARCH_NO_RESULTS' });
          return;
        }
        const a = dataArray.map(item => {
          return {
            id: item.venue.id,
            name: item.venue.displayName,
            lat: item.venue.lat,
            lng: item.venue.lng,
            uri: item.venue.uri,
            coords: `${item.venue.lat}${item.venue.lng}`,
          };
        });
        dispatch({
          type: 'CONCERT_SEARCH_SUCCESS',
          data: {
            venues: uniqueVenues(a, item => item.coords),
            events: dataArray,
          },
        });
      })
      .catch(err => {
        dispatch({ type: 'CONCERT_SEARCH_ERROR', err });
      });
  };
};

const uniqueVenues = (a, key) => {
  const uniqueArray = [...new Map(a.map(x => [key(x), x])).values()];

  return uniqueArray;
};
// Credit Arun Saini (Stackoverflow) https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
