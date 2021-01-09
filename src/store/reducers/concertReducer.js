const initState = {
            venues: [],
            events: []
        }

const concertReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CONCERT_SEARCH_SUCCESS':
            return {
                ...action.data
            }
        case 'CONCERT_SEARCH_ERROR':
            console.log(action.err)
            return state;
        default:
            return state;
    }
}

export default concertReducer;