import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import { keyGen, computeMillis, getTime, storage } from '../../lib';
import Controls from '../Controls';

const INTERVAL = 100;
const round = (ms) => Math.round(ms / INTERVAL) * INTERVAL;
const nowish = () => round(Date.now());

const Timer = ({
  autoStart,
  controls,
  direction,
  from,
  limit,
  playBeep,
  onComplete,
  storageKey,
}) => {
  const isCountDown = direction === -1;
  const { STORAGE_KEY, STARTED_KEY, RUNNING_KEY } = keyGen(storageKey);

  const isRunning = !!storage.getItem(RUNNING_KEY);
  const [running, setRunning] = useState(isRunning);

  const sessionStarted = Number(storage.getItem(STARTED_KEY));
  const [started, setStarted] = useState(sessionStarted);

  const initialTime = computeMillis(from);
  const sessionTime = storage.getItem(STORAGE_KEY);
  let defaultTime;
  if (sessionTime) {
    defaultTime = started
      ? initialTime + direction * (nowish() - started)
      : Number(sessionTime);
  } else {
    defaultTime = initialTime;
  }
  const [time, setTime] = useState(defaultTime);

  useEffect(() => {
    if (running && time !== initialTime) {
      switch (time) {
        case 0:
          const play = () => playBeep('high');
          play();
          setTimeout(play, 250);
          setTimeout(play, 500);
          break;
        case 5000:
        case 4000:
        case 3000:
        case 2000:
        case 1000:
          playBeep('low');
          break;
        default:
          break;
      }
    }
  }, [running, time, initialTime, playBeep]);

  let timer = useRef();

  const start = () => {
    timer.current = setInterval(
      () => setTime((t) => t + direction * INTERVAL),
      INTERVAL
    );
    if (!started) {
      let startedAt;
      if (isCountDown) {
        const elapsed = initialTime - (Number(sessionTime) || initialTime);
        startedAt = nowish() - elapsed;
      } else {
        startedAt = nowish() - time;
      }
      setStarted(startedAt);
      storage.setItem(STARTED_KEY, startedAt);
    }
    setRunning(true);
    storage.setItem(RUNNING_KEY, true);
  };

  const stop = () => {
    clearInterval(timer.current);
    setRunning(false);
    setStarted(0);
    [RUNNING_KEY, STARTED_KEY].forEach(storage.removeItem);
  };

  const reset = () => {
    setTime(initialTime);
  };

  useEffect(() => {
    if (running || autoStart) {
      start();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isCountDown && time <= 0) {
      if (running && onComplete) {
        onComplete();
      }
      stop();
    } else {
      if (!isCountDown && limit && time >= computeMillis(limit)) {
        if (running && onComplete) {
          onComplete();
        }
        stop();
      }
    }
    storage.setItem(STORAGE_KEY, time);
  }, [time]); // eslint-disable-line react-hooks/exhaustive-deps

  const disabled = {
    start: isCountDown ? time <= 0 : limit && time >= computeMillis(limit),
    reset: running || time === initialTime,
  };

  return (
    <>
      <div className="time mb-4">
        <pre className="has-background-white is-size-1 p-2">
          {getTime(time)}
        </pre>
      </div>
      {controls && (
        <Controls
          running={running}
          disabled={disabled}
          start={start}
          stop={stop}
          reset={reset}
        />
      )}
    </>
  );
};

// const timeFormat = /^\d+:\d\d\.?\d?$/;
// const propError = prop =>`The "${prop}" prop must be of the format 99#:##.9 ("9" digits optional)`;
// Timer.propTypes = {
//   autoStart: PropTypes.bool,
//   controls: PropTypes.bool,
//   direction: PropTypes.oneOf([-1, 1]).isRequired,
//   from: PropTypes.string.isRequired,
//   fromValue: function(props) {
//     if (!props.from.match(timeFormat)) {
//       return Error(propError('from'))
//     }
//   },
//   limit: PropTypes.string,
//   limitValue: function(props) {
//     if (props.limit && !props.limit.match(timeFormat)) {
//       return Error(propError('limit'))
//     }
//   },
//   onComplete: PropTypes.func,
//   storageKey: PropTypes.string.isRequired,
// }
//
// Timer.defaultProps = {
//   autoStart: false,
//   controls: true,
//   onComplete: undefined,
// }

export default Timer;
