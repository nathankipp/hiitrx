import React, { useState, useRef, useEffect } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Progress from '../Progress';
import Login from '../Login';
import Data from '../Data';
import Home from '../Home';
import Header from '../Header';
import Today from '../Today';
import Lift from '../Lift';
import Results from '../../Results';

export default function App({ isLoaded, authenticate }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [working, setWorking] = useState(false);
  const first = useRef(true)

  useEffect(() => {
    // XRRF69iF12Dcoo2wXAOJdekS0K03Jjgk8ZrFFYcbZzk=
    const hash = window.sessionStorage.getItem('hash');
    if (hash && first.current) {
      setWorking(true);
      console.error('running login effect');
      authenticate(hash)
        .then(() => setAuthenticated(true))
        .catch(() => {})
        .finally(() => {
          setInitialized(true);
          setWorking(false);
        });
    } else {
      setInitialized(true);
    }
    first.current = false;
  }, [isLoaded, authenticate]);

  if (working) {
    return <Progress />;
  }

  return !initialized ? null : (
    <Router>
      <Header />
      <Switch>
        <Route path="/login">
          <Login authenticateApp={setAuthenticated} />
        </Route>
        {!authenticated && <Redirect to="/login" />}
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/today">
          <Today />
        </Route>
        <Route path="/lift">
          <Lift />
        </Route>
        <Route path="/results">
          <Results />
        </Route>
        <Route
          path="/data/:table(lift)"
          render={rp => <Data rp={rp} />}
        />
        <Redirect to="/home" />
      </Switch>
    </Router>
  );
}
