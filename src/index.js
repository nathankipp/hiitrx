import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Lift from './Lift';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.addEventListener("contextmenu", function(e) { e.preventDefault(); })

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="links">
        <Link to="tap">Tap</Link>
        <Link to="lift">Lift</Link>
      </div>
      <Switch>
        <Route path="/lift" component={Lift} />
        <Route component={App} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
