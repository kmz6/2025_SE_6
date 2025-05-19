export const formatPhoneNumber = (value) => {
  if (!value) return "";
  const raw = value.replace(/\D/g, "");

  // 02
  if (raw.startsWith("02")) {
    if (raw.length <= 2) return raw;
    if (raw.length <= 5) return `${raw.slice(0, 2)}-${raw.slice(2)}`;
    if (raw.length === 9)
      return `${raw.slice(0, 2)}-${raw.slice(2, 5)}-${raw.slice(5)}`;
    return value;
  }

  // 010
  if (raw.length <= 3) return raw;
  if (raw.length <= 6) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
  if (raw.length === 10)
    return `${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6)}`;
  if (raw.length === 11)
    return `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7)}`;

  return value;
};
