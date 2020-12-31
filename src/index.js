import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, createFirestoreInstance, getFirestore } from 'redux-firestore';
import fbConfig from './config/fbConfig';
import firebase from 'firebase/app';


const store = createStore(rootReducer, 
  compose( // for adding multiple "store enhancers"
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})), // adding the thunk middleware - with extras
    reduxFirestore(fbConfig), // sets up the firebase config so that getFirestore etc have access to the firebase config
  )    
);

const rrfProps = {
  firebase, 
  config: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

const target = document.getElementById('root')
ReactDOM.render(

    <React.StrictMode>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Provider store={store}>
          <App />
        </Provider>
      </ReactReduxFirebaseProvider>
    </React.StrictMode>,
    target)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
