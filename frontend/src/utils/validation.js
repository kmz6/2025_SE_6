export const isValidPhone = (phone) => {
  const raw = phone.replace(/-/g, "");

  if (/^02\d{7}$/.test(raw)) return true;
  if (/^0[3-9]\d\d{8}$/.test(raw)) return true;
  if (/^010\d{8}$/.test(raw)) return true;

  return false;
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
