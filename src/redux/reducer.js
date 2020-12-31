import { actionTypes } from './actions';
import { getFullDate } from '../lib';

const {
  LOAD,
  RESET,
  SET_ACTIVITY,
  SET_EFFORT,
  SET_TODAY,
  SET_LIFTS,
  SET_PRESSURES,
  SET_EVENTS,
  SET_USER,
} = actionTypes;

export const DEFAULT_STATE = {
  date: null, // set as today on save
  hash: null,
  email: null,
  name: null,
  age: null,
  events: [],
  schedule: {},
  fitnessTests: {}, // omitted on save
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
    case SET_PRESSURES:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          [today]: {
            ...state.schedule[today],
            pressures: payload,
          },
        },
      };
    case SET_EVENTS:
      return {
        ...state,
        events: payload,
      };
    case SET_USER:
      return {
        ...state,
        name: payload.name,
        age: payload.age,
      };
    default:
      return state;
  }
}
