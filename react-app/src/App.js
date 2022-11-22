import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navigation/NavBar';

import MainPage from './components/navigation/MainPage';
// import Stock from './components/Stock/Stock'
import Watchlists from './components/Watchlist/allWatchlists';

import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import AllStocks from './components/Stock/allstocks';
import SingleStock from './components/Stock/singleStock';
import SingleWatchlist from './components/Watchlist/singleWatchlist';
import LineGraph from './components/Portfolio/LineGraph';
import Stock from './components/Stock/Stock';
import TeamIntro from './components/Portfolio/TeamIntro';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <MainPage />
        </Route>
        <Route path='/stocks/:stockId' exact={true}>
          <SingleStock />
        </Route>
        {/* <Route path='/stocks' exact={true}>
          <AllStocks />
        </Route> */}
        <Route path='/watchlists/:watchlistId' exact={true}>
          <SingleWatchlist />
        </Route>
        {/* <Route path='/testing' exact={true}>
          <Stock />
        </Route> */}
        <Route path='/testing' exact={true}>
          <Stock />
        </Route>
        <Route path='/team' exact={true}>
          <TeamIntro />
        </Route>
      </Switch>
      <Route>
      </Route>
    </BrowserRouter>
  );
}

export default App;
