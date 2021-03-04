import { dummyData } from '../data/dummy';

const initState = dummyData;

const weatherReducer = (state = initState, action) => {
  switch (action.type) {
    case 'WEATHER_SEARCH_SUCCESS':
      return {
        ...action.data,
      };
    case 'WEATHER_SEARCH_ERROR':
      console.log(action.err);
      return state;
    default:
      return state;
  }
};

export default weatherReducer;
