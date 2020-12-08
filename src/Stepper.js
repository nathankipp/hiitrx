import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faDotCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const progress = path => step => {
  let className = "step-item is-success";
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
}

const showSteps = pathname =>
  ['/today', '/lift', '/results'].includes(pathname);

function Stepper({ location: { pathname }}) {
  const classNames = progress(pathname);
  return (
    <div className="px-4 is-flex has-background-link-light is-justify-content-space-between is-align-items-center">
      <div className="head-space has-text-info"><b>HIITRx</b></div>
      {showSteps(pathname) && (
        <div className="is-flex-grow-1 my-1 px-6">
          <div className="steps is-small">
            <div className={classNames(0)}>
              <div className="step-marker"><FontAwesomeIcon icon={faSmile} /></div>
            </div>
            <div className={classNames(1)}>
              <div className="step-marker"><FontAwesomeIcon icon={faDotCircle} /></div>
            </div>
            <div className={classNames(2)}>
              <div className="step-marker"><FontAwesomeIcon icon={faCheckCircle} /></div>
            </div>
          </div>
        </div>
      )}
      <div className="head-space" />
    </div>
  );
}

export default withRouter(Stepper);
