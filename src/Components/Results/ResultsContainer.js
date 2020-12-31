import { connect } from 'react-redux';
import Results from './Results';
import { getFullDate, table } from '../../lib';

const TESTS = [
  { id: 'ac', name: 'Aerobic Capacity' },
  { id: 'ap', name: 'Aerobic Power' },
  { id: 'nc', name: 'Anaerobic Capacity' },
];

const getReadines = (schedule) =>
  ['motivated', 'fast', 'sleep', 'sleepHours'].reduce(
    (acc, cur) => acc + table[cur][schedule[cur]],
    0
  );

const getNextTest = (schedule = {}) => {
  const testsTaken = Object.keys(schedule)
    .sort((a, b) => b.localeCompare(a))
    .reduce(
      (acc, cur) =>
        schedule[cur].fitnessTest &&
        !acc.find((testId) => testId === schedule[cur].fitnessTest.id)
          ? [...acc, schedule[cur].fitnessTest.id]
          : acc,
      []
    );

  return testsTaken.length < TESTS.length
    ? TESTS.find((test) => !testsTaken.includes(test.id)) // first not taken
    : TESTS.find((test) => test.id === testsTaken[testsTaken.length - 1]); // next in cycle
};

const getAvgSpeed = (lifts) => {
  const speeds = [...lifts.sort()];
  if (speeds.length === 5) {
    speeds.pop();
    speeds.shift();
  }
  const avg =
    speeds.reduce((acc, cur) => Number(acc) + Number(cur), 0) / speeds.length;

  return Math.round(avg);
};

const mapStateToProps = ({ schedule }) => {
  const sched = schedule[getFullDate()];

  return {
    readiness: getReadines(sched),
    nextTest: getNextTest(sched),
    speed: getAvgSpeed(sched.lifts),
  };
};

export default connect(mapStateToProps)(Results);
