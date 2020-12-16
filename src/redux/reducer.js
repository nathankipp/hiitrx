import { actionTypes } from './actions';
import getFullDate from '../utils/getFullDate';

const {
  LOAD,
  RESET,
  SET_ACTIVITY,
  SET_EFFORT,
  SET_TODAY,
  SET_LIFTS,
} = actionTypes;

export const DEFAULT_STATE = {
  date: null,
  hash: null,
  email: null,
  name: null,
  age: null,
  schedule: {},
};

export default function (state = DEFAULT_STATE, action) {
  const { type, payload } = action;
  const today = getFullDate();
  switch (type) {
    case LOAD:
      return {
        ...state,
        ...payload,
      };
    case RESET:
      return {
        ...state,
        ...DEFAULT_STATE,
      };
    case SET_ACTIVITY:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          [payload.date]: {
            ...(state.schedule[payload.date] || {}),
            activity: payload.activity,
          },
        },
      };
    case SET_EFFORT:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          [payload.date]: {
            ...(state.schedule[payload.date] || {}),
            effort: payload.effort,
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
    default:
      return state;
  }
}
