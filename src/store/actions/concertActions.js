import axios from 'axios';

const songKickKey = process.env.REACT_APP_SONGKICK_API_KEY;
const munichId = '28549'

export const concertSearch = (dates) => {
    return (dispatch, getState) => {
        const config = {
            method: 'get', 
            url: `https://api.songkick.com/api/3.0/metro_areas/${munichId}/calendar.json?apikey=${songKickKey}&min_date=${dates.arrival}&max_date=${dates.departure}`,
        }
            axios(config).then(resp => {
                const dataArray = resp.data.resultsPage.results.event;
                const a = dataArray.map(item => {
                    return  {
                        id: item.venue.id,
                        name: item.venue.displayName,
                        lat: item.venue.lat,
                        lng: item.venue.lng,
                        uri: item.venue.uri,
                        coords: `${item.venue.lat}${item.venue.lng}`,
                    }
                })
                dispatch({type: 'CONCERT_SEARCH_SUCCESS', data: {
                    venues: uniqueVenues(a, item => item.coords),
                    events: dataArray,
                }
                })

            }).catch(err => {
                dispatch({type: 'CONCERT_SEARCH_ERROR', err})
            })
    }
}

const uniqueVenues = (a, key) => {
    const uniqueArray = [
        ...new Map(
            a.map(x => [key(x), x])
        ).values()
        ]

    return uniqueArray
}