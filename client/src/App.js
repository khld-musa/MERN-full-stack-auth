import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { Route, HashRouter as Router, Switch, Redirect} from 'react-router-dom'
import axios from 'axios';
import Auth from './Components/Auth/Auth';
import MainNavigation from './Containers/Menubar/MainNavigation/MainNavigation';
import { AuthContext } from './context/auth-context'
import Profile from './Components/Users/Profile/Profile';



let logoutTimer;

const App = (props) => {


  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [isLoading, setIsloading] = useState(true)

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setIsloading(false)
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('profileData');
    let token = null
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    setIsloading(false)
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  let route
  let loading
  if (isLoading) {
    loading = (<>
      <div className="container loading">
        <div className="mar-20">
          {/* <Spinner /> */}
        </div>
      </div>
    </>)
  }
  else {
    route = (
      <>
                 
        {token ? <Route path="/profile" exact component={Profile} /> : <Redirect to="/profile" />}

      </>
    )
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <div className="App">

        <main>
          <Router>
            <MainNavigation />
            <Switch>
              <Route path="/public/:id" component={Profile} />
              <Route path="/auth" component={Auth} exact />
              {route}

            </Switch>
          </Router>
        </main>
        {loading}

      </div>
    </AuthContext.Provider>
  );
}

export default (App);;
