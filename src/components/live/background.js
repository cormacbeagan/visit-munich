import axios from 'axios';

const songKickKey = process.env.REACT_APP_SONGKICK_API_KEY;
const munichId = '28549'

const Search = {
    async songKick(dates) {
        const config = {
            method: 'get', 
            url: `https://api.songkick.com/api/3.0/metro_areas/${munichId}/calendar.json?apikey=${songKickKey}&min_date=${dates.arrival}&max_date=${dates.departure}`,
        }
        try {
            const response = await axios(config)
            const dataArray = response.data.resultsPage.results.event;
            console.log(dataArray)
            const a = dataArray.map(item => {
                return  {
                        id: item.venue.id,
                        name: item.venue.displayName,
                        lat: item.venue.lat,
                        lng: item.venue.lng,
                        coords: `${item.venue.lat}${item.venue.lng}`,
                }
            })
           return {
               venues: this.uniqueVenues(a, item => item.coords),
               data: dataArray,
           }

        } catch(err) {console.log(err)}
    },

    uniqueVenues(a, key) {
        const uniqueArray = [
            ...new Map(
                a.map(x => [key(x), x])
            ).values()
            ]

        return uniqueArray
    }
}

export default Search;