import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faStopwatch, faRunning, faSwimmer, faBiking } from '@fortawesome/free-solid-svg-icons';
import LS from './ls';
import SliderScale from './SliderScale';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const getDay = day => day < 7 ? DAYS[day] : DAYS[day - 7];
const getDayText = (today, plus) => !plus ? 'Today' : plus === 1 ? 'Tomorrow' : getDay(today + plus);

export default function Home() {
  const [forecast, setForecast] = useState({});
  const [days, setDays] = useState([]);

  useEffect(() => {
    let fcast;
    try {
      fcast = JSON.parse(LS.getItem('forecast')) || {};
    } catch(e) {
      fcast = {};
    }
    const dys = [];
    const today = new Date().getDay();
    [0,1,2,3,4,5,6].forEach((day) => {
      const d = new Date(Date.now() + 1000 * 60 * 60 * 24 * day);
      const date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
      fcast[date] = fcast[date] || {
        date,
        day: getDayText(today, day),
        activity: [0,0,0], // off, hiit, other
        effort: 5,
      };
      dys.push(date);
    });
    setForecast(fcast);
    setDays(dys);
  }, []);

  const setAndUpdate = (fcast) => {
    setForecast(fcast);
    LS.setItem('forecast', JSON.stringify(fcast));
  }

  const setSchedule = (date, activity) => {
    const updated = { ...forecast };
    updated[date] = {
      ...forecast[date],
      activity
    };
    setAndUpdate(updated);
  };

  const setEffort = (date, effort) => {
    const updated = { ...forecast };
    updated[date] = {
      ...forecast[date],
      effort
    };
    setAndUpdate(updated);
  }

  const shouldShowTodayButton = !days
    .map(day => forecast[day]?.activity.includes(1))
    .includes(false);
  const speed = LS.getItem('speed');
  const todayButtonLink = LS.isValid() && speed
    ? `/results?speed=${speed}`
    : '/today'

  const getColor = toggle => toggle ? "has-text-success" : "has-text-grey-light";

  return (
    <div className="forecast m-4 x">
      <div className="headings columns is-mobile">
        <div className="column has-text-weight-bold is-3 forecast-day">Day</div>
        <div className="column has-text-weight-bold is-3 has-text-centered">Off</div>
        <div className="column has-text-weight-bold is-3 has-text-centered">HIIT</div>
        <div className="column has-text-weight-bold is-3 has-text-centered">Other</div>
      </div>
      {days.map((date, idx) => (
        <Fragment key={date}>
          <div className={`columns is-mobile ${idx % 2 ? 'has-background-white-ter' : ''}`}>
            <div className="column has-text-weight-bold is-3 forecast-day">{forecast[date].day}</div>
            <div className="clickable column is-3 is-flex is-justify-content-center is-align-items-center" onClick={() => setSchedule(date, [1,0,0])}>
              <FontAwesomeIcon className={getColor(forecast[date].activity[0])} icon={faBed} size="lg" />
            </div>
            <div className="clickable column is-3 is-flex is-justify-content-center is-align-items-center" onClick={() => setSchedule(date, [0,1,0])}>
              <FontAwesomeIcon className={getColor(forecast[date].activity[1])} icon={faStopwatch} size="lg" />
            </div>
            <div className="clickable column is-3 is-flex is-justify-content-center is-align-items-center is-relative" onClick={() => setSchedule(date, [0,0,1])}>
              <FontAwesomeIcon className={`mx-1 ${getColor(forecast[date].activity[2])}`} icon={faSwimmer} size="sm" />
              <FontAwesomeIcon className={`mx-1 ${getColor(forecast[date].activity[2])}`} icon={faBiking} size="sm" />
              <FontAwesomeIcon className={`mx-1 ${getColor(forecast[date].activity[2])}`} icon={faRunning} size="sm" />
            </div>
          </div>
          {shouldShowTodayButton && idx === 0 && !!forecast[date].activity[1] && (
            <div className={`columns is-mobile ${idx % 2 ? 'has-background-white-ter' : ''}`}>
              <div className="column is-12 is-flex is-justify-content-center is-align-items-center">
                <Link to={todayButtonLink}><button className="button is-large">Today's Workout</button></Link>
              </div>
            </div>
          )}
          {!!forecast[date].activity[2] && (
            <div className={`columns is-mobile ${idx % 2 ? 'has-background-white-ter' : ''}`}>
              <div className="column is-12 is-flex is-align-items-center">
                <div className="mb-1 mx-4 has-text-centered">Anticipated<br />Effort</div>
                <div className="is-flex-grow-1 mx-4">
                  <input
                    defaultValue={forecast[date].effort}
                    className="slider is-warning is-fullwidth is-large mt-2"
                    step=".25"
                    min="0"
                    max="10"
                    type="range"
                    onChange={(e) => setEffort(date, e.target.value)}
                  />
                  <SliderScale scale={['light', 'moderate', 'hard']} />
                </div>
              </div>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
