import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    setUser({
      email: LS.getItem('email'),
      name: LS.getItem('name'),
      age: LS.getItem('age'),
    });
  }, []);

  useEffect(() => {
    if (user) {
      console.log('setting auth', !!user?.email);
      setAuth(!!user?.email);
    }
  }, [user]);

  const onSubmit = e => {
    e.preventDefault();
    return new Promise(resolve => {
      LS.items.forEach(({ field }) => {
        const value = (e.target[field].value || '').trim();
        LS.setItem(field, value);
      });
      const valid = LS.isValid();
      // setIsValid(valid);
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
        <Route
          path="/data/:table(lift)"
          render={rp => <Data rp={rp} />}
        />
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
        <Route>
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  );
}
