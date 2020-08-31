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
          <div className="wrapper">
            <div className="links">
              {isValid && <Link to="/tap">Tap</Link>}
              {isValid && <Link to="/lift">Lift</Link>}
              <Link to="/user">
                <div className="user">
                  {
                    [
                      new Date().toLocaleDateString(),
                      LS.getItem('name'),
                    ].map(t => t ? <>{t}<br /></> : null)
                  }
                </div>
              </Link>
            </div>
            {isValid
              ? <Switch>
                  <Route path="/lift">
                    <Lift />
                  </Route>
                  <Route path="/tap">
                    <Tap />
                  </Route>
                  <Route>
                    <Tform onSubmit={onSubmit} />}
                  </Route>
                </Switch>
              : <Tform onSubmit={onSubmit} />
            }
          </div>
        </Route>
      </Switch>
    </Router>
  );
}
