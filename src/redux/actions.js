import { fetchItem, put, storage } from '../lib';

const LOAD = 'LOAD';
const RESET = 'RESET';
const SET_ACTIVITY = 'SET_ACTIVITY';
const SET_EFFORT = 'SET_EFFORT';
const SET_TODAY = 'SET_TODAY';
const SET_LIFTS = 'SET_LIFTS';
const SET_PRESSURES = 'SET_PRESSURES';

export const actionTypes = {
  LOAD,
  RESET,
  SET_ACTIVITY,
  SET_EFFORT,
  SET_TODAY,
  SET_LIFTS,
  SET_PRESSURES,
};

export const load = (payload) => ({ type: LOAD, payload });

export const reset = () => ({ type: RESET });

export const authenticate = (hash) => (dispatch) =>
  fetchItem('hiitrx', { hash })
    // .then(x => new Promise(resolve => setTimeout(() => resolve(x), 2000)))
    .then((state) => {
      if (state) {
        storage.setItem('hash', state.hash);
        dispatch(load(state));
        return Promise.resolve(state.hash);
      }
      storage.removeItem('hash');
      dispatch(reset());
      return Promise.reject();
    });

export const setActivity = (payload) => ({ type: SET_ACTIVITY, payload });

export const setEffort = (payload) => ({ type: SET_EFFORT, payload });

export const setToday = (payload) => ({ type: SET_TODAY, payload });

export const setLifts = (payload) => ({ type: SET_LIFTS, payload });

export const setPressures = (payload) => ({ type: SET_PRESSURES, payload });

export const updateHiitrx = () => (_, getState) => put(getState());
