const initState = {
            venues: [],
            events: [],
            msg: null
}

const concertReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CONCERT_SEARCH_SUCCESS':
            return {
                ...action.data
            }
        case 'CONCERT_SEARCH_ERROR':
            console.log(action.err)
            return state

        case 'CONCERT_SEARCH_NO_RESULTS':
            console.log('No results')
            return {
                ...initState,
                msg: 'No Results'
                
            };
        default:
            return state;
    }
}

export default concertReducer;