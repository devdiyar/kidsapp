import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import { JwtResponse } from '../types/auth';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: null | any; // Später mit User-Typ typisieren wenn User-Daten geladen werden
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: JwtResponse }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

interface AuthContextType {
  state: AuthState;
  login: (emailBenutzername: string, passwort: string) => Promise<boolean>;
  register: (
    vorname: string,
    nachname: string,
    email: string,
    benutzername: string,
    passwort: string,
    geburtsdatum: Date
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
        user: null,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check authentication status on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isLoggedIn = await authService.isLoggedIn();
      if (isLoggedIn) {
        dispatch({ type: 'AUTH_SUCCESS', payload: {} as JwtResponse });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (emailBenutzername: string, passwort: string): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });
    
    const result = await authService.login(emailBenutzername, passwort);
    
    if (result.success && result.data) {
      dispatch({ type: 'AUTH_SUCCESS', payload: result.data });
      return true;
    } else {
      dispatch({ type: 'AUTH_ERROR', payload: result.error || 'Login fehlgeschlagen' });
      return false;
    }
  };

  const register = async (
    vorname: string,
    nachname: string,
    email: string,
    benutzername: string,
    passwort: string,
    geburtsdatum: Date
  ): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });
    
    const result = await authService.register(
      vorname,
      nachname,
      email,
      benutzername,
      passwort,
      geburtsdatum
    );
    
    if (result.success && result.data) {
      dispatch({ type: 'AUTH_SUCCESS', payload: result.data });
      return true;
    } else {
      dispatch({ type: 'AUTH_ERROR', payload: result.error || 'Registrierung fehlgeschlagen' });
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    state,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
