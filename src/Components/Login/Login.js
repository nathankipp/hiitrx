import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { storage } from '../../lib';

function Login({ reset, authenticate, authenticateApp, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [working, setWorking] = useState(false);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    storage.removeItem('hash');
    reset();
    authenticateApp(false);
  }, [reset, authenticateApp]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setWorking(true);
      setInvalid(false);
      authenticate({ email, password })
        .then((hash) => {
          storage.setItem('hash', hash);
          authenticateApp(true);
          history.push('/home');
        })
        .catch((e) => {
          setWorking(false);
          setInvalid(true);
        });
    } else {
      setInvalid(true);
    }
  };

  return (
    <div className="hero">
      <div className="hero-body has-text-centered">
        <section className="section is-flex-grow-1">
          <form onSubmit={onSubmit}>
            <input
              className="input mb-4"
              id="email"
              name="email"
              defaultValue=""
              type="text"
              placeholder="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input mb-4"
              id="password"
              name="password"
              defaultValue=""
              type="password"
              placeholder="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className={`button is-black ${working ? 'is-loading' : ''}`}
              type="submit"
            >
              Go
            </button>
          </form>
          {invalid && <div className="mt-4 has-text-danger">invalid</div>}
        </section>
      </div>
    </div>
  );
}

export default withRouter(Login);
