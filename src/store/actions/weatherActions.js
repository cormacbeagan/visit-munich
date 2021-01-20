import axios from 'axios';

const weatherKey = process.env.REACT_APP_VW_KEY;

export const weatherSearch = (dates) => {
    return (dispatch, getState) => {
        const arrival = new Date(dates.arrival.getTime() - (dates.arrival.getTimezoneOffset() * 60000))
        .toISOString()
        .split('T')[0];
        const departure = new Date(dates.departure.getTime() - (dates.departure.getTimezoneOffset() * 60000))
        .toISOString()
        .split('T')[0];

        console.log(arrival, departure)


        const config = {
            method: 'get', 
            url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/munich/${arrival}/${departure}?unitGroup=metric&key=${weatherKey}`,
        }
        axios(config).then(resp => {
            console.log(resp)
            const dataArray = resp.data.days;
            dispatch({type: 'WEATHER_SEARCH_SUCCESS', data: {
                weather: dataArray,
            }
            })
        }).catch(err => {
            dispatch({type: 'WEATHER_SEARCH_ERROR', err})
        })
    }
}
