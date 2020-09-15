import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import LS from './ls';
import Lift from './Lift';
import Tap from './Tap';
import Tform from './Tform';
import Data from './Data';

export default function App() {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(v => LS.isValid());
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    LS.items.forEach(({ field }) => {
      const value = (e.target[field].value || '').trim();
      console.log(field, value);
      if (value) {
        LS.setItem(field, value);
      }
    });
    if (LS.isValid()) {
      setIsValid(true);
      setTimeout(() => window.scrollTo(0,0), 500);
      return true;
    }
    return;
  }

  return (
    <Router>
      <Switch>
        <Route
          path="/data/:table(lift|tap)"
          render={rp => <Data rp={rp} />}
        />
        <Route>
          <nav className="navbar has-background-info-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <Link className="navbar-item is-size-7 has-text-white" to="/user">
              {
                [
                  new Date().toLocaleDateString(),
                  LS.getItem('name'),
                ].map(t => t ? <>{t}<br /></> : null)
              }
              </Link>
              {isValid && <Link className="navbar-item has-text-white" to="/lift">Lift</Link>}
              {false && isValid && <Link className="navbar-item has-text-white" to="/tap">Tap</Link>}
            </div>
          </nav>
          {isValid
            ? <Switch>
                <Route path="/lift">
                  <Lift />
                </Route>
                <Route path="/tap">
                  <Tap />
                </Route>
                <Route>
                  <Tform onSubmit={onSubmit} />
                </Route>
              </Switch>
            : <Tform onSubmit={onSubmit} />
          }
        </Route>
      </Switch>
    </Router>
  );
}
