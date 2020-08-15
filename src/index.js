import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import LS from './ls';
import Lift from './Lift';
import Tap from './Tap';
import Tform from './Tform';
import * as serviceWorker from './serviceWorker';

window.addEventListener("contextmenu", function(e) { e.preventDefault(); })

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="wrapper">
        <div className="links">
          {LS.isValid() && <Link to="/tap">Tap</Link>}
          {LS.isValid() && <Link to="/lift">Lift</Link>}
          <Link to="/user">
            <div className="user">
              {LS.getItem('name') || new Date().toLocaleDateString()}
            </div>
          </Link>
        </div>
        {LS.isValid()
          ? <Switch>
              <Route path="/lift" component={Lift} />
              <Route path="/tap" component={Tap} />
              <Route component={Tform} />
            </Switch>
          : <Tform />
        }
        </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
