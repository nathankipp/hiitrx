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

function Stepper({ location: { pathname }}) {
  const classNames = progress(pathname);
  return (
    <>
      <div className="tri-tap is-pulled-left ml-4"><b>tri-tap</b></div>
      <div className="steps is-small mt-1 mb-0 ml-6">
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
    </>
  );
}

export default withRouter(Stepper);
