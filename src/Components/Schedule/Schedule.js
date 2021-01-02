import React, { Fragment, useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faStopwatch,
  faRunning,
  faSwimmer,
  faBiking,
} from '@fortawesome/free-solid-svg-icons';
import SliderScale from '../SliderScale';
import { getFullDate } from '../../lib';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date().getDay();
const getDay = (day) => (day < 7 ? DAYS[day] : DAYS[day - 7]);
const getDayText = (plus) =>
  !plus ? 'Today' : plus === 1 ? 'Tomorrow' : getDay(today + plus);

const restMessages = [
  'Rest up!',
  'Enjoy your day off :)',
  'Save some energy',
  'Rest & refuel',
  'Put your feet up',
  'Remember to hydrate',
  'Take a load off',
];
const randomMessage = restMessages[Math.floor(Math.random() * 7)];

const getColor = (toggle) =>
  toggle ? 'has-text-success' : 'has-text-grey-light';

function Schedule({ schedule, setActivity, setEffort, updateHiitrx, history }) {
  const [dates, setDates] = useState([]);
  const updateFn = useRef(
    // react's synthetic event plays poorly w/ debounce for onChanges
    // this ain't great; nor is the double-noop; FIX?
    debounce(() => updateHiitrx().then(noop).catch(noop), 250)
  );

  useEffect(() => {
    const dts = [];
    [0, 1, 2, 3, 4, 5, 6].forEach((day) => {
      const date = new Date(Date.now() + 1000 * 60 * 60 * 24 * day);
      dts.push(getFullDate(date));
    });
    setDates(dts);
  }, []);

  useEffect(() => {
    updateFn.current();
  }, [schedule]);

  const saveAndNext = () =>
    updateHiitrx()
      .then(() => {
        const to = !!schedule[dates[0]]?.lifts
          ? !!schedule[dates[0]]?.workout
            ? '/workout'
            : '/results'
          : '/today';
        history.push(to);
      })
      .catch(() => console.error('update failed'));

  // only show button if there are entries for next # days
  const DAYS_OUT = 4;
  const haveEnoughEntries = !dates
    .slice(0, DAYS_OUT)
    .map((date) => (schedule[date]?.activity || []).includes(1))
    .includes(false);

  const showTodayMessage = (date, idx) =>
    !!schedule[date]?.activity?.[1] && idx === 0;

  const showRestMessage = (date, idx) =>
    !!schedule[date]?.activity?.[0] && idx === 0;

  return (
    <div className="table m-4">
      <div className="headings columns is-mobile">
        <div className="column is-3 forecast-day">Day</div>
        <div className="column is-3 has-text-centered">Off</div>
        <div className="column is-3 has-text-centered">HIIT</div>
        <div className="column is-3 has-text-centered">Other</div>
      </div>
      {dates.map((date, idx) => {
        const iconColor = (key) => getColor(!!schedule[date]?.activity?.[key]);
        const setActivityHandler = (activity) =>
          setActivity({ date, activity });
        const setEffortHandler = (e) =>
          setEffort({ date, effort: e.target.value });
        return (
          <Fragment key={date}>
            <div
              className={`columns is-mobile ${
                idx % 2 ? 'has-background-white-ter' : ''
              }`}
            >
              <div className="column is-3 has-text-weight-bold forecast-day">
                {getDayText(idx)}
              </div>
              <div
                className="clickable column is-3 is-flex is-justify-content-center is-align-items-center"
                onClick={() => setActivityHandler([1, 0, 0])}
              >
                <FontAwesomeIcon
                  className={iconColor(0)}
                  icon={faBed}
                  size="lg"
                />
              </div>
              <div
                className="clickable column is-3 is-flex is-justify-content-center is-align-items-center"
                onClick={() => setActivityHandler([0, 1, 0])}
              >
                <FontAwesomeIcon
                  className={iconColor(1)}
                  icon={faStopwatch}
                  size="lg"
                />
              </div>
              <div
                className="clickable column is-3 is-flex is-justify-content-center is-align-items-center is-relative"
                onClick={() => setActivityHandler([0, 0, 1])}
              >
                <FontAwesomeIcon
                  className={`mx-1 ${iconColor(2)}`}
                  icon={faSwimmer}
                  size="sm"
                />
                <FontAwesomeIcon
                  className={`mx-1 ${iconColor(2)}`}
                  icon={faBiking}
                  size="sm"
                />
                <FontAwesomeIcon
                  className={`mx-1 ${iconColor(2)}`}
                  icon={faRunning}
                  size="sm"
                />
              </div>
            </div>
            {showTodayMessage(date, idx) && (
              <div
                className={`columns is-mobile ${
                  idx % 2 ? 'has-background-white-ter' : ''
                }`}
              >
                <div className="column is-12 is-flex is-justify-content-center is-align-items-center">
                  {haveEnoughEntries ? (
                    <button
                      className="button is-large mb-3"
                      onClick={saveAndNext}
                    >
                      <FontAwesomeIcon
                        className="mr-4 has-text-success"
                        icon={faStopwatch}
                      />
                      <span>Today's HIITRx</span>
                    </button>
                  ) : (
                    <div className="py-5 has-text-info">
                      Plan the next {DAYS_OUT} days to get your workout
                    </div>
                  )}
                </div>
              </div>
            )}
            {showRestMessage(date, idx) && (
              <div className="columns">
                <div className="column is-12 has-text-centered">
                  <div className="py-5 has-text-info">{randomMessage}</div>
                </div>
              </div>
            )}
            {!!schedule[date]?.activity?.[2] && (
              <div
                className={`columns is-mobile ${
                  idx % 2 ? 'has-background-white-ter' : ''
                }`}
              >
                <div className="column is-12 is-flex is-align-items-center">
                  <div className="mb-1 mx-4 has-text-centered">
                    Anticipated
                    <br />
                    Effort
                  </div>
                  <div className="is-flex-grow-1 mx-4">
                    <input
                      defaultValue={schedule?.[date]?.effort}
                      className="slider is-warning is-fullwidth is-large mt-2"
                      step=".25"
                      min="0"
                      max="10"
                      type="range"
                      onChange={setEffortHandler}
                    />
                    <SliderScale scale={['light', 'moderate', 'hard']} />
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

export default withRouter(Schedule);
