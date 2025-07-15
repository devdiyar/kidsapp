export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedEmail = email.trim();

  if (!emailRegex.test(trimmedEmail)) return false;

  if (trimmedEmail.length < 5 || trimmedEmail.length > 254) return false;

  const domain = trimmedEmail.split("@")[1];
  if (domain && domain.length < 3) return false;

  return true;
};

export const validatePassword = (password: string): boolean => {
  if (password.length < 8) return false;

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasLetter && hasNumber;
};

export const validateUsername = (username: string): boolean => {
  const trimmedUsername = username.trim();

  if (trimmedUsername.length < 3 || trimmedUsername.length > 20) return false;

  if (/^[0-9]/.test(trimmedUsername)) return false;

  return true;
};

export const validateRequiredField = (value: string): boolean => {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) return false;

  if (trimmedValue.length > 500) return false;

  return true;
};

export const validatePasswordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  if (!password || !confirmPassword) return false;
  return password === confirmPassword;
};

export const validateDate = (
  day: number,
  month: number,
  year: number
): boolean => {
  if (day === 0 || month === 0 || year === 0) return false;

  const date = new Date(year, month - 1, day);
  const currentDate = new Date();

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false;
  }

  const minAge = 10;
  const maxAge = 100;

  const age = currentDate.getFullYear() - year;
  const monthDiff = currentDate.getMonth() - (month - 1);
  const dayDiff = currentDate.getDate() - day;

  const actualAge =
    monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

  if (actualAge < minAge || actualAge > maxAge) return false;

  if (date > currentDate) return false;

  return true;
};

export const formatDateForAPI = (
  day: number,
  month: number,
  year: number
): string => {
  const date = new Date(year, month - 1, day);
  return date.toISOString().split("T")[0];
};

export const validateName = (name: string): boolean => {
  const trimmedName = name.trim();

  if (trimmedName.length < 2 || trimmedName.length > 50) return false;

  return true;
};
