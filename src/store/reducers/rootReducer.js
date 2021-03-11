import authReducer from './authReducer';
import concertReducer from './concertReducer';
import weatherReducer from './weatherReducer';
import dateReducer from './dateReducer';
import entryReducer from './entryReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  concerts: concertReducer,
  weather: weatherReducer,
  dates: dateReducer,
  entries: entryReducer,
});

export default rootReducer;
