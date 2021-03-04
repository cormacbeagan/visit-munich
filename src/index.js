import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Loading from './components/universal/loading';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded,
} from 'react-redux-firebase';
import {
  reduxFirestore,
  createFirestoreInstance,
  getFirestore,
} from 'redux-firestore';
import fbConfig from './config/fbConfig';
import firebase from 'firebase/app';
import { useSelector } from 'react-redux';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig)
  )
);

const profileProps = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false,
};

const rrfProps = {
  firebase,
  config: fbConfig && profileProps,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) return <Loading />;
  return children;
}

const target = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  target
);
