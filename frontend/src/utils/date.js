export const startOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

export const endOfWeek = (date) => {
  const start = startOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return new Date(end.getFullYear(), end.getMonth(), end.getDate());
};

export function parseDateString(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addOneDay(dateStr) {
  const date = parseDateString(dateStr);
  date.setDate(date.getDate() + 1);
  return date;
}

export function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

export function isDateInRange(dateStr, start, end) {
  return dateStr >= start && dateStr <= end;
}

export function getRandomBackgroundColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 50%, 90%)`;
}
