// const API = "http://localhost:8080/"; // Lokal
const API = "http://10.0.2.2:8080/";  // Emulator

export const API_ENDPOINTS = {
  REGISTER: `${API}/{endpunkt}`,
  LOGIN: `${API}/{endpunkt}`,
  REFRESH_TOKEN: `${API}/{endpunkt}`,
};
