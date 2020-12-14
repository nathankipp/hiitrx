import { fetchItem, put } from '../utils/db';

const LOAD = 'LOAD';
const SET_STATUS = 'SET_STATUS';
const RESET = 'RESET';
const SET_SCHEDULE = 'SET_SCHEDULE';
const SET_TODAY = 'SET_TODAY';
const SET_LIFTS = 'SET_LIFTS';

export const actionTypes = {
  LOAD,
  SET_STATUS,
  RESET,
  SET_SCHEDULE,
  SET_TODAY,
  SET_LIFTS,
};

export const load = payload => ({ type: LOAD, payload });

export const setStatus = payload => ({ type: SET_STATUS });

export const reset = () => ({ type: RESET });

export const authenticate = (hash) => (dispatch) =>
  fetchItem('hiitrx', { hash })
    // .then(x => new Promise(resolve => setTimeout(() => resolve(x), 2000)))
    .then(state => {
      if (state) {
        window.sessionStorage.setItem('hash', state.hash);
        dispatch(load(state));
        return Promise.resolve(state.hash);
      }
      window.sessionStorage.removeItem('hash');
      dispatch(reset());
      return Promise.reject();
    });

export const setSchedule = (payload) => ({ type: SET_SCHEDULE, payload });

export const setToday = (payload) => ({ type: SET_TODAY, payload });

export const setLifts = (payload) => ({ type: SET_LIFTS, payload });

export const updateHiitrx = () => (_, getState) => put(getState());
