import authReducer from './authReducer';
import projectReducer from './projectReducer';
import concertReducer from './concertReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    concerts: concertReducer,
});

export default rootReducer;