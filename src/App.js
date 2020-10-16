import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import LS from './ls';
import Lift from './Lift';
import Tform from './Tform';
import Data from './Data';

export default function App() {
  // const [isValid, setIsValid] = useState(false);

  // useEffect(() => {
  //   setIsValid(v => LS.isValid());
  //   window.setInterval(() => {
  //     if (!LS.isValid()) {
  //       setIsValid(false);
  //     }
  //   }, 60000);
  // }, []);

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
          <div className="p-2 m-0 has-background-link">&nbsp;</div>
          <Switch>
            <Route path="/lift">
              <Lift />
            </Route>
            <Route>
              <Tform onSubmit={onSubmit} />
            </Route>
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
}

// <nav className="navbar has-background-info-dark" role="navigation" aria-label="main navigation">
//   <div className="navbar-brand">
//     <Link className="navbar-item is-size-7 has-text-white" to="/user">
//     {
//       [
//         new Date().toLocaleDateString(),
//         LS.getItem('name'),
//       ].map(t => t ? <React.Fragment key={t}>{t}<br /></React.Fragment> : null)
//     }
//     </Link>
//     {isValid && <Link className="navbar-item has-text-white" to="/lift">Lift</Link>}
//     {false && isValid && <Link className="navbar-item has-text-white" to="/tap">Tap</Link>}
//   </div>
// </nav>
