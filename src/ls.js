const LS = 'local';
const SS = 'session';

const ITEMS = [
  { label: 'Date', field: 'date', type: 'hidden', db: SS },
  { label: 'Name', field: 'name', db: LS },
  { label: 'Age', field: 'age', type: "number", db: LS },
  {
    label: 'How motivated are you to train?',
    field: 'motivated',
    type: 'slider',
    db: SS
  },
  {
    label: 'How fast do you feel?',
    field: 'fast',
    type: 'slider',
    scale: ['Slow', 'Normal', 'Fast'],
    db: SS
  },
  {
    label: 'How well did you sleep last night?',
    field: 'sleep',
    type: 'slider',
    scale: ['Worse', 'Normal', 'Better'],
    db: SS
  },
  {
    label: 'How long did you sleep?',
    field: 'sleepHours',
    type: 'time',
    db: SS,
  },
];

const whichDb = item => {
  const i = ITEMS.find(({ field }) => field === item);
  return i && i.db;
}

function getItem(item) {
  let value;
  const db = whichDb(item);
  if (db === LS) {
    value = window.localStorage.getItem(item);
  } else if (db === SS) {
    value = window.sessionStorage.getItem(item);
  }
  return value;
}

function setItem(item, value) {
  const db = whichDb(item);
  if (db === LS) {
    window.localStorage.setItem(item, value);
  } else if (db === SS) {
    window.sessionStorage.setItem(item, value);
  }
}

function isValid() {
  const hasAll = !ITEMS.map(({ field }) => !!getItem(field)).includes(false);
  return hasAll && getItem('date') === new Date().toLocaleDateString();
}

export default {
  items: ITEMS,
  getItem,
  setItem,
  isValid,
};
