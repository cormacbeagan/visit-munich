import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navBar';
import Eat from './components/eat';
import Home from './components/home';
import Walks from './components/walks';
import Live from './components/live';
import Weather from './components/weather';


function App() {

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='content'>
          <Switch>
            <Route
              exact path="/"
              render={() => <Home/>}
            />
            <Route
              path="/walks"
              render={() => <Walks />}
            />
            <Route
              path="/eat"
              render={() => <Eat />}
            />
            <Route
              path="/live"
              render={() => <Live />}
            />
            <Route
              path="/weather"
              render={() => <Weather />}
            />
          </Switch>
        </div>
      </div>
    </Router>

  );
}

export default App;
