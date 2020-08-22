const items = [
  { label: 'date', field: 'date', type: 'hidden' },
  { label: 'Name', field: 'name' },
  { label: 'Age', field: 'age', type: "number" },
];

function getItem(item) {
  return window.sessionStorage.getItem(item) || '';
}

function setItem(item, value) {
  window.sessionStorage.setItem(item, value);
}

function isValid() {
  return getItem('date') === new Date().toLocaleDateString()
   && getItem('name');
}

export default {
  items,
  getItem,
  setItem,
  isValid,
};
