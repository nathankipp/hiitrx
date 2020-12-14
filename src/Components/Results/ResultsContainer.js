import { connect } from 'react-redux';
import Results from './Results';
import getFullDate from '../utils/getFullDate';
import table from '../utils/table';

const getAvgSpeed = lifts => {
  const speeds = [...lifts.sort()];
  if (speeds.length === 5) {
    speeds.pop();
    speeds.shift();
  }
  const avg = speeds.reduce((acc, cur) =>
    Number(acc) + Number(cur), 0)/speeds.length;

  return Math.round(avg);
}

const getReadines = schedule =>
  ['motivated', 'fast', 'sleep', 'sleepHours'].reduce((acc, cur) => (
    acc + table[cur][schedule[cur]]
  ), 0);

const mapStateToProps = ({ schedule }) => {
  const sched = schedule[getFullDate()];

  return {
    speed: getAvgSpeed(sched.lifts),
    readiness: getReadines(sched),
  };
};

export default connect(mapStateToProps)(Results);
