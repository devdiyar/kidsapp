// const API = "http://localhost:8080/api"; // Lokal
const API = "http://10.0.2.2:8080/api"; // Lokale Entwicklung auf dem Emulator

export const API_ENDPOINTS = {
  // Authentifizierung
  REGISTER: `${API}/registrierteNutzer/auth/registrieren`,
  LOGIN: `${API}/registrierteNutzer/auth/anmelden`,
  REFRESH_TOKEN: `${API}/registrierteNutzer/auth/refreshtoken`,

  // Veranstaltungen
  VERANSTALTUNGEN: `${API}/veranstaltungen`,
  VERANSTALTUNG_BY_ID: (id: number) => `${API}/veranstaltungen/${id}`,
};
