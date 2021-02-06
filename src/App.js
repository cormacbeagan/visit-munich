import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/NavBar/navBar'
import Home from './components/home/home'
import Loading from './components/universal/loading'
import './styles/app.css'
const Tips = React.lazy(() => import('./components/tips/tips'))
const Walks = React.lazy(() => import('./components/walks/walks'))
const Live = React.lazy(() => import('./components/live/live'))
const Weather = React.lazy(() => import('./components/weather/weather'))
const SignIn = React.lazy(() => import('./components/auth/signin'))
const SignUp = React.lazy(() => import('./components/auth/signup'))
const CreateWall = React.lazy(() => import('./components/walks/createWall'))
const WallDetails = React.lazy(() => import('./components/walks/wallDetails'))
const CreateBlog = React.lazy(() => import('./components/home/createBlog'))
const EditBlog = React.lazy(() => import('./components/home/editBlog'))
const CreateTip = React.lazy(() => import('./components/tips/createTip'))
const EditTip = React.lazy(() => import('./components/tips/editTip'))

//import Tips from './components/tips/tips'
//import Walks from './components/walks/walks'
//import Live from './components/live/live'
//import Weather from './components/weather/weather'
//import SignIn from './components/auth/signin'
//import SignUp from './components/auth/signup'
//import CreateWall from './components/walks/createWall'
//import DisplayWall from './components/walks/wallDetails'
//import CreateBlog from './components/home/createBlog'
//import EditBlog from './components/home/editBlog'
// import CreateTip from './components/tips/createTip'
// import EditTip from './components/tips/editTip'

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <main className='app-content'>
                    <Switch>
                        <Route exact path='/' render={() => <Home />} />
                        <Suspense fallback={<Loading />}>
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
                                render={() => <WallDetails />}
                            />
                            <Route
                                path='/editblog/:id'
                                render={() => <EditBlog />}
                            />
                            <Route
                                path='/createtip'
                                render={() => <CreateTip />}
                            />
                            <Route
                                path='/edittip/:id'
                                render={() => <EditTip />}
                            />
                        </Suspense>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App
