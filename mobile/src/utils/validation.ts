export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateUsername = (username: string): boolean => {
  return username.trim().length >= 3;
};

export const validateRequiredField = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validatePasswordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

export const validateDate = (
  day: number,
  month: number,
  year: number
): boolean => {
  if (day === 0 || month === 0 || year === 0) return false;

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

export const formatDateForAPI = (
  day: number,
  month: number,
  year: number
): string => {
  const date = new Date(year, month - 1, day);
  return date.toISOString().split("T")[0];
};
