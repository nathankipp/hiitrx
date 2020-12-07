import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LS from './ls';
import Data from './Data';
import Login from './Login';
import Stepper from './Stepper';
import Tform from './Tform';
import Lift from './Lift';
import Results from './Results';

export default function App() {
  const [user, setUser] = useState();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setUser({
      email: LS.getItem('email'),
      name: LS.getItem('name'),
      age: LS.getItem('age'),
    });
  }, []);

  useEffect(() => {
    if (user?.email) {
      setAuth(true);
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

  if (!user) {
    return null;
  }

  if (!auth) {
    return (
      <Router>
        <Login setUser={setUser} />
      </Router>
    );
  }

  return (
    <Router>
      <Switch>
        <Route
          path="/data/:table(lift)"
          render={rp => <Data rp={rp} />}
        />
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route>
          <Stepper />
          <Switch>
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
              <Redirect to="/today" />
            </Route>
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
}
