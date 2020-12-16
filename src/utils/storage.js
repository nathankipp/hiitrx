const LS = "local";
const SS = "session";

const ITEMS = [
  { name: "hash", db: SS },
  { name: "workout", db: LS },
];

const whichDb = (item) => {
  const i = ITEMS.find(({ name }) => name === item);
  return i && i.db;
};

function setItem(item, value) {
  const db = whichDb(item);
  if (db === LS) {
    window.localStorage.setItem(item, value);
  } else {
    window.sessionStorage.setItem(item, value);
  }
}

function getItem(item) {
  let value;
  const db = whichDb(item);
  if (db === LS) {
    value = window.localStorage.getItem(item);
  } else {
    value = window.sessionStorage.getItem(item);
  }
  return value;
}

function removeItem(item, value) {
  const db = whichDb(item);
  if (db === LS) {
    window.localStorage.removeItem(item, value);
  } else {
    window.sessionStorage.removeItem(item, value);
  }
}

export default {
  setItem,
  getItem,
  removeItem,
};
