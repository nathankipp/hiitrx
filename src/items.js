import { v4 as uuid } from 'uuid';

const USER = 'unspecified';

export function liftItem(data) {
  const {
    id = uuid(),
    timestamp = Date.now(),
    user = USER,
    winNavUa = window.navigator.userAgent,
  } = data;

  return {
    id,
    timestamp,
    user,
    winNavUa,
    ...data
  };
}
