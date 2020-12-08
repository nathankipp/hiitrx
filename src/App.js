import React, { useState, useRef, useEffect } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LS from './ls';
import Login from './Login';
import Data from './Data';
import Home from './Home';
import Stepper from './Stepper';
import Tform from './Tform';
import Lift from './Lift';
import Results from './Results';

export default function App() {
  const [user, setUser] = useState();
  const [auth, setAuth] = useState(true);
  const isReady = useRef(false);

  useEffect(() => {
    setUser({
      email: LS.getItem('email'),
      name: LS.getItem('name'),
      age: LS.getItem('age'),
    });
  }, []);

  useEffect(() => {
    if (isReady.current) { // skip first run
      setAuth(!!user?.email);
    }
    isReady.current = true;
  }, [user]);

  const onSubmit = e => {
    e.preventDefault();
    return new Promise(resolve => {
      LS.items.forEach(({ field }) => {
        const value = (e.target[field].value || '').trim();
        LS.setItem(field, value);
      });
      const valid = LS.isValid();
      if (valid) {
        setTimeout(() => window.scrollTo(0,0), 500);
        resolve(true);
      }
      resolve(false);
    });
  }

  return (
    <Router>
      <Stepper />
      <Switch>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        {!auth && <Redirect to="/login" />}
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/today">
          <Tform onSubmit={onSubmit} />
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
