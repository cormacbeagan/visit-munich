import React from 'react';
import ReactDOM from 'react-dom';
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
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";


const store = createStore(rootReducer, 
  compose( // for adding multiple "store enhancers"
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})), // adding the thunk middleware - with extras
    reduxFirestore(fbConfig), // sets up the firebase config so that getFirestore etc have access to the firebase config
  )    
);

// cannot get the user profile details attached to the firebase object - should be on the profile key
const profileProps = {
  userProfile: "users",
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false,
};

const rrfProps = {
  firebase,
  config: fbConfig && profileProps,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div className="center">
        {" "}
        <h4>Loading...</h4>
      </div>
    );
  return children;
}

const target = document.getElementById('root')
  ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
   ,target)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
