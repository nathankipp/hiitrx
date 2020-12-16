import reducer, { DEFAULT_STATE } from './reducer';
import {
  load,
  reset,
  setActivity,
  setEffort,
  setToday,
  setLifts,
  setPressures,
} from './actions';

jest.mock('../utils/getFullDate', () => () => '2021-01-01');

describe('hiitrx reducer', () => {
  let INITIAL_STATE;
  beforeEach(() => {
    INITIAL_STATE = {
      hash: 'foo',
      name: 'Foo',
      email: 'foo@email.com',
      age: 50,
      schedule: {
        '2020-12-31': {
          activity: [1, 0, 0],
        },
      },
    };
  });

  it('processes load()', () => {
    const action = load({
      foo: 'bar',
    });
    const newState = reducer(INITIAL_STATE, action);
    expect(newState.foo).toBe('bar');
  });

  it('processes reset()', () => {
    const action = reset();
    const newState = reducer(INITIAL_STATE, action);
    expect(newState).toEqual(DEFAULT_STATE);
  });

  it('processes setActivity', () => {
    const action = setActivity({
      date: '2021-01-01',
      activity: [1, 0, 0],
    });
    const newState = reducer(INITIAL_STATE, action);
    expect(newState.schedule['2020-12-31']).toEqual(
      INITIAL_STATE.schedule['2020-12-31']
    );
    expect(newState.schedule).toMatchObject({
      '2021-01-01': {
        activity: [1, 0, 0],
      },
    });
  });

  it('processes setEffort', () => {
    const action = setEffort({
      date: '2021-01-01',
      effort: 7.25,
    });
    const newState = reducer(INITIAL_STATE, action);
    expect(newState.schedule['2020-12-31']).toEqual(
      INITIAL_STATE.schedule['2020-12-31']
    );
    expect(newState.schedule).toMatchObject({
      '2021-01-01': {
        effort: 7.25,
      },
    });
  });

  it('processes setToday', () => {
    const action = setToday({
      motivated: '1.2',
      fast: '3.4',
      sleep: '5.6',
      sleepHours: '7.8',
    });
    const newState = reducer(INITIAL_STATE, action);
    expect(newState.schedule['2020-12-31']).toEqual(
      INITIAL_STATE.schedule['2020-12-31']
    );
    expect(newState.schedule).toMatchObject({
      '2021-01-01': {
        motivated: 1.2,
        fast: 3.4,
        sleep: 5.6,
        sleepHours: 7.8,
      },
    });
  });

  it('processes setLifts', () => {
    const action = setLifts([123, 456, 789]);
    const newState = reducer(INITIAL_STATE, action);
    expect(newState.schedule['2020-12-31']).toEqual(
      INITIAL_STATE.schedule['2020-12-31']
    );
    expect(newState.schedule).toMatchObject({
      '2021-01-01': {
        lifts: [123, 456, 789],
      },
    });
  });

  it('processes setPressures', () => {
    const action = setPressures([-1, 0.1, 0.99]);
    const newState = reducer(INITIAL_STATE, action);
    expect(newState.schedule['2020-12-31']).toEqual(
      INITIAL_STATE.schedule['2020-12-31']
    );
    expect(newState.schedule).toMatchObject({
      '2021-01-01': {
        pressures: [-1, 0.1, 0.99],
      },
    });
  });
});
