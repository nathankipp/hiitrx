import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSmile,
  faDotCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

const progress = (path) => (step) => {
  let className = 'step-item is-success';
  const isToday = path === '/today';
  const isLift = path === '/lift';
  const isResults = path === '/results';

  if (isToday && step === 0) {
    className += ' is-active';
  }
  if (isLift) {
    if (step === 0) className += ' is-completed';
    if (step === 1) className += ' is-active';
  }
  if (isResults) {
    if (step < 2) className += ' is-completed';
    else className += ' is-active';
  }

  return className;
};

function Header({ isLoaded, name, location: { pathname } }) {
  const showSteps =
    isLoaded && ['/today', '/lift', '/results'].includes(pathname);
  const showHomeLink = !['/login', '/home'].includes(pathname);
  const showGreeting =
    isLoaded && !['/login', '/lift', '/workout'].includes(pathname);
  const stepperClass = progress(pathname);

  return (
    <>
      <div className="px-4 is-flex has-background-link-light is-justify-content-space-between is-align-items-center">
        <div className="head-space has-text-info">
          <b>HIITRx</b>
        </div>
        {showSteps && (
          <div className="is-flex-grow-1 my-1 px-6">
            <div className="steps is-small">
              <div className={stepperClass(0)}>
                <div className="step-marker">
                  <FontAwesomeIcon icon={faSmile} />
                </div>
              </div>
              <div className={stepperClass(1)}>
                <div className="step-marker">
                  <FontAwesomeIcon icon={faDotCircle} />
                </div>
              </div>
              <div className={stepperClass(2)}>
                <div className="step-marker">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="head-space">
          {showHomeLink && (
            <Link to="/home">
              <FontAwesomeIcon
                className="has-text-info"
                icon={faHome}
                size="lg"
              />
            </Link>
          )}
        </div>
      </div>
      {showGreeting && (
        <div className="px-4 py-4 is-flex is-justify-content-space-between is-align-items-center">
          <strong>Hello, {name}</strong>
          <Link to="/login">
            <button className="button is-small">not {name}?</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default withRouter(Header);
