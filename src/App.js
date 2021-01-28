import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/NavBar/navBar'
import Tips from './components/tips/tips'
import Home from './components/home/home'
import Walks from './components/walks/walks'
import Live from './components/live/live'
import Weather from './components/weather/weather'
import SignIn from './components/auth/signin'
import SignUp from './components/auth/signup'
import CreateWall from './components/walks/createWall'
import DisplayWall from './components/walks/wallDetails'
import CreateBlog from './components/home/createBlog'
import EditBlog from './components/home/editBlog'
import CreateTip from './components/tips/createTip'
import EditTip from './components/tips/editTip'
import './styles/app.css'

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <div className='app-content'>
                    <Switch>
                        <Route exact path='/' render={() => <Home />} />
                        <Route path='/walks' render={() => <Walks />} />
                        <Route path='/tips' render={() => <Tips />} />
                        <Route path='/live' render={() => <Live />} />
                        <Route path='/weather' render={() => <Weather />} />
                        <Route path='/signin' render={() => <SignIn />} />
                        <Route path='/signup' render={() => <SignUp />} />
                        <Route
                            path='/createwall'
                            render={() => <CreateWall />}
                        />
                        <Route
                            path='/createblog'
                            render={() => <CreateBlog />}
                        />
                        <Route
                            path='/wall/:id'
                            render={() => <DisplayWall />}
                        />
                        <Route
                            path='/editblog/:id'
                            render={() => <EditBlog />}
                        />
                        <Route path='/createtip' render={() => <CreateTip />} />
                        <Route path='/edittip/:id' render={() => <EditTip />} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default App
