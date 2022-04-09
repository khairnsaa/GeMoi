// import react
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

// import component
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import ManageGamesPage from './pages/ManageGamesPage'
import ManageMoviesPage from './pages/ManageMoviesPage'
import Home from "./pages/Home";
import { GameProvider } from "./context/GamesContext";
import { MovieProvider } from "./context/MovieContext";
import Movies from "./pages/Movies";
import Games from "./pages/Games";
import AddGame from "./pages/AddGame";
import AddMovie from "./pages/AddMovie";
import Footer from "./components/Footer";
import DetailMovie from "./pages/DetailMovie";
import DetailGame from "./pages/DetailGame";
import ChangePassword from "./pages/ChangePassword";

const Routes = () => {


    const LoginRoute = ({ ...props }) => Cookies.get('token') !== undefined ? <Redirect to='/' /> : <Route {...props} />;
    const PrivateRoute = ({ ...props }) => Cookies.get('token') !== undefined ? <Route {...props} /> : <Redirect to='/login' />;

    return ( 
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <MovieProvider>
                        <GameProvider>
                            <div className='container'>
                                <LoginRoute path='/login' component={Login} />
                                <LoginRoute path='/signup'>
                                    <Signup />
                                </LoginRoute>                            
                                <Route exact path='/'>
                                    <Home />
                                </Route>
                                <Route exact path='/movies'>
                                    <Movies />
                                </Route>
                                <Route path='/movies/:Id'>
                                    <DetailMovie />
                                </Route>
                                <Route exact path='/games'>
                                    <Games />
                                </Route>
                                <Route path='/games/:Id'>
                                    <DetailGame />
                                </Route>
                                <Route path='/addgame'>
                                    <AddGame />
                                </Route>
                                <Route path='/addmovie'>
                                    <AddMovie />
                                </Route>
                                <Route exact path='/manage-game/edit/:Id'component={AddGame} />
                                <Route exact path='/manage-game'>
                                    <ManageGamesPage />
                                </Route>
                                <Route exact path='/manage-movies/edit/:Id'component={AddMovie} />
                                <Route exact path='/manage-movies'>
                                    <ManageMoviesPage />
                                </Route>
                                <PrivateRoute path='/change-password'>
                                    <ChangePassword />
                                </PrivateRoute>
                            </div>
                        </GameProvider>
                    </MovieProvider>
                </Switch>
                <Footer />
            </Router>
        </div>
     );
}
 
export default Routes;