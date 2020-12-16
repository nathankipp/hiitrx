export default function getFullDate(d = new Date()) {
  const fullDate = [d.getFullYear()];
  const mo = d.getMonth() + 1;
  fullDate.push(mo < 10 ? `0${mo}` : mo);
  const dy = d.getDate();
  fullDate.push(d < 10 ? `0${dy}` : dy);
  return fullDate.join("-");
}
