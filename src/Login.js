import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchItem } from './db';
import LS from './ls';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

// console.log(Base64.stringify(sha256('')));
const authenticate = (email, password) => fetchItem(
  'users',
  { hash: Base64.stringify(sha256(`${email}${password}`)) },
  ['email', 'name', 'age']
);

function Login({ setUser, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const invalidate = () => {
      setLoading(false);
      setInvalid(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      setInvalid(false);
      authenticate(email, password)
        .then(user => {
          if (user.email) {
            ['email', 'name', 'age'].forEach(
              v => LS.setItem(v, user[v])
            );
            setUser(user);
            history.push('/home');
          } else {
            invalidate();
          }
        })
        .catch(invalidate);
    } else {
      setInvalid(true);
    }
  }

  return (
    <div className="hero">
      <div className="hero-body has-text-centered">
        <section className="section is-flex-grow-1">
          <form onSubmit={onSubmit}>
            <input
              className="input mb-4"
              id='email'
              name='email'
              defaultValue=''
              type='text'
              placeholder="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input mb-4"
              id='password'
              name='password'
              defaultValue=''
              type='password'
              placeholder="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className={`button is-black ${loading ? 'is-loading' : ''}`}
              type="submit"
            >
              Go
            </button>
          </form>
          { invalid && <div className="mt-4 has-text-danger">invalid</div> }
        </section>
      </div>
    </div>
  )
}

export default withRouter(Login);
