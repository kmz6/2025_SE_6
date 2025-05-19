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

export const isValidPassword = (password) => {
  if (password.length < 8) {
    return "비밀번호는 최소 8자 이상이어야 합니다.";
  }
  if (password.length > 16) {
    return "비밀번호는 최대 16자 이하여야 합니다.";
  }
  return "";
};
