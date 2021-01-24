import authReducer from './authReducer';
import projectReducer from './projectReducer';
import concertReducer from './concertReducer';
import weatherReducer from './weatherReducer';
import dateReducer from './dateReducer';
import blogReducer from './blogReducer';
import tipReducer from './tipReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    concerts: concertReducer,
    weather: weatherReducer,
    dates: dateReducer,
    blogs: blogReducer,
    tips: tipReducer,
});

export default rootReducer;