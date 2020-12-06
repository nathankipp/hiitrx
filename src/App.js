import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LS from './ls';
import Data from './Data';
import Stepper from './Stepper';
import Tform from './Tform';
import Lift from './Lift';
import Results from './Results';

export default function App() {

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
      <Switch>
        <Route
          path="/data/:table(lift)"
          render={rp => <Data rp={rp} />}
        />
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
