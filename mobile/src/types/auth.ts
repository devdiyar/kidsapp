// Base Interfaces
export interface LoginRequest {
  emailBenutzername: string;
  passwort: string;
}

export interface RegisterRequest {
  email: string;
  benutzername: string;
  passwort: string;
  vorname: string;
  nachname: string;
  geburtsdatum: string; 
}

export interface JwtResponse {
  token: string;
  refreshToken: string;
  tokenType: string;
}

export interface User {
  id: number;
  email: string;
  benutzername: string;
  vorname: string;
  nachname: string;
  geburtsdatum: string;
}

export interface AuthResult<T = JwtResponse> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

export type AuthAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_AUTH'; payload: { isAuthenticated: boolean; user?: User } }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' };
