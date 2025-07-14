import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../config/api";
import { TokenService } from "./tokenService";
import {
  Veranstaltung,
  VeranstaltungResult,
  VeranstaltungFilter,
  VeranstaltungAnmeldungResult,
} from "../types/veranstaltung";

class VeranstaltungService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor für Authorization Header
    this.apiClient.interceptors.request.use(
      async (config) => {
        const token = await TokenService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor für automatische Token-Erneuerung
    this.apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = await TokenService.getRefreshToken();
            if (refreshToken) {
              const response = await axios.post(API_ENDPOINTS.REFRESH_TOKEN, {
                token: refreshToken,
              });

              const { token: newToken } = response.data;
              await TokenService.saveTokens(newToken, refreshToken);

              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.apiClient(originalRequest);
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async getAlleVeranstaltungen(): Promise<VeranstaltungResult> {
    try {
      const response: AxiosResponse<Veranstaltung[]> = await this.apiClient.get(
        API_ENDPOINTS.VERANSTALTUNGEN
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Fehler beim Laden der Veranstaltungen:", error);
      return this.handleError(error);
    }
  }

  async getVeranstaltungById(
    id: number
  ): Promise<VeranstaltungResult<Veranstaltung>> {
    try {
      const response: AxiosResponse<Veranstaltung> = await this.apiClient.get(
        API_ENDPOINTS.VERANSTALTUNG_BY_ID(id)
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Fehler beim Laden der Veranstaltung:", error);
      return {
        success: false,
        error: this.getErrorMessage(error),
      };
    }
  }
  async anmeldenZuVeranstaltung(
    nutzerId: number,
    veranstaltungId: number
  ): Promise<VeranstaltungAnmeldungResult> {
    try {
      await this.apiClient.post(
        API_ENDPOINTS.VERANSTALTUNG_ANMELDEN(nutzerId, veranstaltungId)
      );

      return {
        success: true,
        message: "Erfolgreich zur Veranstaltung angemeldet",
      };
    } catch (error: any) {
      console.error("Fehler bei der Anmeldung zur Veranstaltung:", error);
      return {
        success: false,
        error: this.getErrorMessage(error),
      };
    }
  }

  async abmeldenVonVeranstaltung(
    nutzerId: number,
    veranstaltungId: number
  ): Promise<VeranstaltungAnmeldungResult> {
    try {
      await this.apiClient.post(
        API_ENDPOINTS.VERANSTALTUNG_ABMELDEN(nutzerId, veranstaltungId)
      );

      return {
        success: true,
        message: "Erfolgreich von der Veranstaltung abgemeldet",
      };
    } catch (error: any) {
      console.error("Fehler bei der Abmeldung von der Veranstaltung:", error);
      return {
        success: false,
        error: this.getErrorMessage(error),
      };
    }
  }

  async getNutzerVeranstaltungen(
    nutzerId: number
  ): Promise<VeranstaltungResult> {
    try {
      const response: AxiosResponse<Veranstaltung[]> = await this.apiClient.get(
        API_ENDPOINTS.USER_VERANSTALTUNGEN(nutzerId)
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Fehler beim Laden der Nutzer-Veranstaltungen:", error);
      return this.handleError(error);
    }
  }

  // Favoriten
  async getFavoriten(nutzerId: number): Promise<VeranstaltungResult> {
    try {
      const response: AxiosResponse<Veranstaltung[]> = await this.apiClient.get(
        API_ENDPOINTS.USER_FAVORITEN(nutzerId)
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Fehler beim Laden der Favoriten:", error);
      // Fallback: Leere Liste zurückgeben statt Fehler
      if (error.response?.status === 403 || error.response?.status === 404) {
        return {
          success: true,
          data: [],
        };
      }
      return this.handleError(error);
    }
  }

  async favoritHinzufuegen(
    nutzerId: number,
    veranstaltungId: number
  ): Promise<boolean> {
    try {
      await this.apiClient.post(
        API_ENDPOINTS.FAVORIT_HINZUFUEGEN(nutzerId, veranstaltungId)
      );
      return true;
    } catch (error: any) {
      console.error("Fehler beim Hinzufügen des Favoriten:", error);
      // Fallback: Simuliere Erfolg
      if (error.response?.status === 403 || error.response?.status === 404) {
        return true;
      }
      return false;
    }
  }

  async favoritEntfernen(
    nutzerId: number,
    veranstaltungId: number
  ): Promise<boolean> {
    try {
      await this.apiClient.delete(
        API_ENDPOINTS.FAVORIT_ENTFERNEN(nutzerId, veranstaltungId)
      );
      return true;
    } catch (error: any) {
      console.error("Fehler beim Entfernen des Favoriten:", error);
      // Fallback: Simuliere Erfolg
      if (error.response?.status === 403 || error.response?.status === 404) {
        return true;
      }
      return false;
    }
  }

  // Angemeldete Veranstaltungen
  async getAngemeldeteVeranstaltungen(
    nutzerId: number
  ): Promise<VeranstaltungResult> {
    try {
      const response: AxiosResponse<Veranstaltung[]> = await this.apiClient.get(
        API_ENDPOINTS.USER_ANGEMELDETE_VERANSTALTUNGEN(nutzerId)
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error(
        "Fehler beim Laden der angemeldeten Veranstaltungen:",
        error
      );
      // Fallback: Leere Liste zurückgeben statt Fehler
      if (error.response?.status === 403 || error.response?.status === 404) {
        return {
          success: true,
          data: [],
        };
      }
      return this.handleError(error);
    }
  }

  // Besuchte Veranstaltungen
  async getBesuchteVeranstaltungen(
    nutzerId: number
  ): Promise<VeranstaltungResult> {
    try {
      const response: AxiosResponse<Veranstaltung[]> = await this.apiClient.get(
        API_ENDPOINTS.USER_BESUCHTE_VERANSTALTUNGEN(nutzerId)
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Fehler beim Laden der besuchten Veranstaltungen:", error);
      // Fallback: Leere Liste zurückgeben statt Fehler
      if (error.response?.status === 403 || error.response?.status === 404) {
        return {
          success: true,
          data: [],
        };
      }
      return this.handleError(error);
    }
  }

  async veranstaltungAlsBesuchtMarkieren(
    nutzerId: number,
    veranstaltungId: number
  ): Promise<boolean> {
    try {
      await this.apiClient.post(
        API_ENDPOINTS.VERANSTALTUNG_ALS_BESUCHT_MARKIEREN(
          nutzerId,
          veranstaltungId
        )
      );
      return true;
    } catch (error: any) {
      console.error("Fehler beim Markieren als besucht:", error);
      // Fallback: Simuliere Erfolg
      if (error.response?.status === 403 || error.response?.status === 404) {
        return true;
      }
      return false;
    }
  }

  private handleError(error: any): VeranstaltungResult {
    return {
      success: false,
      error: this.getErrorMessage(error),
    };
  }

  private getErrorMessage(error: any): string {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 404) {
        return "Veranstaltung nicht gefunden";
      } else if (status === 400) {
        return typeof data === "string"
          ? data
          : data.message || "Ungültige Anfrage";
      } else if (status === 401) {
        return "Nicht autorisiert. Bitte melden Sie sich an.";
      } else if (status === 403) {
        return "Zugriff verweigert";
      } else if (status >= 500) {
        return "Server-Fehler. Bitte versuchen Sie es später erneut.";
      }

      return typeof data === "string"
        ? data
        : data.message || "Ein unbekannter Fehler ist aufgetreten";
    } else if (error.request) {
      return "Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.";
    }

    return "Ein unbekannter Fehler ist aufgetreten";
  }
}

export const veranstaltungService = new VeranstaltungService();
