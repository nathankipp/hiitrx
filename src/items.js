import { v4 as uuid } from 'uuid';
import LS from './ls';

const DEFAULTS = {
  name: 'unspecified',
  age: 'unspecified',
};

const lsData = () => LS.items.map(({ field }) => ({ [field]: LS.getItem(field) || DEFAULTS[field] }));

export function liftItem(data) {
  const {
    id = uuid(),
    timestamp = Date.now(),
    winNavUa = window.navigator.userAgent,
  } = data;

  return {
    id,
    timestamp,
    winNavUa,
    ...lsData(),
    ...data,
  };
}
