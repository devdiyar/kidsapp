import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { TokenService } from './tokenService';
import { LoginRequest, RegisterRequest, JwtResponse, AuthResult } from '../types/auth';

class AuthService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
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

              // Retry original request with new token
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.apiClient(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, logout user
            await this.logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async login(emailBenutzername: string, passwort: string): Promise<AuthResult> {
    try {
      const loginData: LoginRequest = {
        emailBenutzername,
        passwort,
      };

      const response: AxiosResponse<JwtResponse> = await this.apiClient.post(
        API_ENDPOINTS.LOGIN,
        loginData
      );

      const { token, refreshToken } = response.data;
      
      await TokenService.saveTokens(token, refreshToken);

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = 'Ein unbekannter Fehler ist aufgetreten';
      
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 401) {
          errorMessage = 'Ungültige Anmeldedaten';
        } else if (typeof data === 'string') {
          errorMessage = data;
        } else if (data.message) {
          errorMessage = data.message;
        }
      } else if (error.request) {
        errorMessage = 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.';
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async register(
    vorname: string,
    nachname: string,
    email: string,
    benutzername: string,
    passwort: string,
    geburtsdatum: Date
  ): Promise<AuthResult> {
    try {
      const registrationData: RegisterRequest = {
        vorname,
        nachname,
        email,
        benutzername,
        passwort,
        geburtsdatum: geburtsdatum.toISOString().split('T')[0], 
    };

      const response: AxiosResponse<JwtResponse> = await this.apiClient.post(
        API_ENDPOINTS.REGISTER,
        registrationData
      );

      const { token, refreshToken } = response.data;
      
      // Tokens sicher speichern
      await TokenService.saveTokens(token, refreshToken);

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Ein unbekannter Fehler ist aufgetreten';
      
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 400) {
          if (typeof data === 'string') {
            errorMessage = data;
          } else if (data.message) {
            errorMessage = data.message;
          } else {
            errorMessage = 'Ungültige Registrierungsdaten';
          }
        } else if (status === 409) {
          errorMessage = 'Benutzername oder E-Mail bereits vergeben';
        }
      } else if (error.request) {
        errorMessage = 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.';
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await TokenService.clearTokens();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async isLoggedIn(): Promise<boolean> {
    return await TokenService.isLoggedIn();
  }
}

export const authService = new AuthService();
