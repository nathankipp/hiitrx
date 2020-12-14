import { fetchItem, put } from '../utils/db';

const LOAD = 'LOAD';
const RESET = 'RESET';
const SET_SCHEDULE = 'SET_SCHEDULE';
const SET_TODAY = 'SET_TODAY';
const SET_LIFTS = 'SET_LIFTS';

export const actionTypes = {
  LOAD,
  RESET,
  SET_SCHEDULE,
  SET_TODAY,
  SET_LIFTS,
};

export const load = payload => ({ type: LOAD, payload });

export const reset = () => ({ type: RESET });

export const authenticate = (hash) => (dispatch) => {
  return fetchItem('hiitrx', { hash })
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
}

export const setSchedule = (payload) => ({ type: SET_SCHEDULE, payload });

export const setToday = (payload) => ({ type: SET_TODAY, payload });

export const setLifts = (payload) => ({ type: SET_LIFTS, payload });

export const updateHiitrx = () => (_, getState) => put(getState());
