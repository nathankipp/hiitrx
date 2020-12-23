import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStopwatch,
  faCalendarAlt,
  faRunning,
  faSwimmer,
  faBiking,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

function Home({ hasLifts }) {
  return (
    <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-stretch">
      {hasLifts && (
        <div className="p-4 has-text-centered">
          <Link to="/workout">
            <button className="button is-large home-button">
              <FontAwesomeIcon
                className="mr-4 has-text-success"
                icon={faStopwatch}
              />
              <span>Today's Workout</span>
            </button>
          </Link>
        </div>
      )}
      <div className="p-4 has-text-centered">
        <Link to="/schedule">
          <button className="button is-large home-button">
            <FontAwesomeIcon
              className="mr-4 has-text-warning"
              icon={faCalendarAlt}
            />
            <span>Weekly Plan</span>
          </button>
        </Link>
      </div>
      <div className="p-4 has-text-centered">
        <Link to="/events">
          <button className="button is-large home-button">
            <FontAwesomeIcon
              className="mr-1 is-size-6 has-text-grey"
              icon={faSwimmer}
            />
            <FontAwesomeIcon
              className="mr-1 is-size-6 has-text-grey"
              icon={faBiking}
            />
            <FontAwesomeIcon
              className="mr-4 is-size-6 has-text-grey"
              icon={faRunning}
            />
            <span>Competitions</span>
          </button>
        </Link>
      </div>
      <div className="p-4 has-text-centered">
        <Link to="/user">
          <button className="button is-large home-button">
            <FontAwesomeIcon className="mr-4 has-text-info" icon={faUser} />
            <span>User Profile</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
