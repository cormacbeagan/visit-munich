import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/NavBar/navBar';
import Eat from './components/eat';
import Home from './components/home';
import Walks from './components/walks/walks';
import Live from './components/live';
import Weather from './components/weather';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import CreateWall from './components/walks/createWall';
import DisplayWall from './components/walks/wallDetails';


function App() {

  return (
    <Router>
      <div>
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
            <Route
              path="/signin"
              render={() => <SignIn/>}
            />
            <Route
              path="/signup"
              render={() => <SignUp/>}
            />
            <Route
              path="/create"
              render={() => <CreateWall/>}
            />
            <Route
              path="/wall/:id"
              render={() => <DisplayWall/>}
            />
          </Switch>
        </div>
      </div>
    </Router>

  );
}


export default App;
