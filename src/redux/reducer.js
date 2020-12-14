import { actionTypes } from './actions';
import getFullDate from '../utils/getFullDate';

const {
  LOAD,
  RESET,
  SET_SCHEDULE,
  SET_TODAY,
  SET_LIFTS,
} = actionTypes;

const DEFAULT_STATE = {
  date: null,
  hash: null,
  email: null,
  name: null,
  age: null,
  schedule: {},
};

export default function(state = DEFAULT_STATE, action) {
  const { type, payload } = action;
  const today = getFullDate();
  switch(type) {
    case LOAD:
      return {
        ...state,
        ...payload,
      };
    case RESET:
      return {
        ...state,
        ...DEFAULT_STATE
      };
    case SET_SCHEDULE:
      const activity = payload.activity
        || state.schedule[payload.date]?.activity
        || null;
      const effort = Number(payload.effort)
        || state.schedule[payload.date]?.effort
        || null;
      return {
        ...state,
        schedule: {
          ...state.schedule,
          [payload.date]: {
            ...(state.schedule[payload.date] || {}),
            activity,
            effort,
          },
        },
      };
    case SET_TODAY:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          [today]: {
            ...state.schedule[today],
            motivated: Number(payload.motivated),
            fast: Number(payload.fast),
            sleep: Number(payload.sleep),
            sleepHours: Number(payload.sleepHours),
          },
        },
      };
    case SET_LIFTS:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          [today]: {
            ...state.schedule[today],
            lifts: payload,
          },
        },
      };
    default: return state;
  }
}
