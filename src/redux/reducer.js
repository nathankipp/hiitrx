import { actionTypes } from './actions';

const {
  LOAD,
  RESET,
  SET_SCHEDULE,
} = actionTypes;

const DEFAULT_STATE = {
  hash: null,
  email: null,
  name: null,
  age: null,
  schedule: {},
};

export default function(state = DEFAULT_STATE, action) {
  const { type, payload } = action;
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
      const effort = payload.effort
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
    default: return state;
  }
}
