import React, { useState, useRef, useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Progress from "../Progress";
import Login from "../Login";
import Data from "../Data";
import Home from "../Home";
import Header from "../Header";
import Today from "../Today";
import Lift from "../Lift";
import Results from "../Results";

function hasReported(schedule) {
  const { motivated, fast, sleep, sleepHours } = schedule;
  return !!(motivated && fast && sleep && sleepHours);
}

function hasLifted(schedule) {
  return !!schedule.lifts;
}

export default function App({ isLoaded, authenticate, todaysSchedule }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [working, setWorking] = useState(false);
  const first = useRef(true);
  const [status, setStatus] = useState({
    isHiitDay: false,
    hasReported: false,
    hasLifted: false,
  });

  useEffect(() => {
    const hash = window.sessionStorage.getItem("hash");
    if (hash && first.current) {
      console.debug("HIITRx: running login effect");
      setWorking(true);
      authenticate(hash)
        .then(() => setAuthenticated(true))
        .catch(() => {})
        .finally(() => {
          setInitialized(true);
          setWorking(false);
        });
    } else {
      setInitialized(true);
    }
    first.current = false;
  }, [isLoaded, authenticate, setStatus]);

  useEffect(() => {
    const newStatus = {
      isHiitDay: !!todaysSchedule.activity?.[1],
      hasReported: hasReported(todaysSchedule),
      hasLifted: hasLifted(todaysSchedule),
    };
    setStatus(newStatus);
  }, [todaysSchedule]);

  if (working) {
    return (
      <Router>
        <Header />
        <Progress />
      </Router>
    );
  }

  return !initialized ? null : (
    <Router>
      <Header />
      <Switch>
        <Route path="/data/:table(lift)" render={(rp) => <Data rp={rp} />} />
        <Route path="/login">
          <Login authenticateApp={setAuthenticated} />
        </Route>
        {!authenticated && <Redirect to="/login" />}
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/today">
          <Today hasReported={status.hasReported} />
        </Route>
        {!status.hasReported && <Redirect to="/home" />}
        <Route path="/lift">
          <Lift />
        </Route>
        {!status.hasLifted && <Redirect to="/home" />}
        <Route path="/results">
          <Results />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </Router>
  );
}
