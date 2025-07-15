import * as SecureStore from 'expo-secure-store';

const KEYS = {
  TOKEN: 'jwt_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

export class TokenService {
  // Vereinfachte Token-Operationen
  static async saveTokens(token: string, refreshToken: string): Promise<void> {
    await Promise.all([
      SecureStore.setItemAsync(KEYS.TOKEN, token),
      SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, refreshToken)
    ]);
  }

  static async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(KEYS.TOKEN);
  }

  static async getRefreshToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);
  }

  static async clearTokens(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync(KEYS.TOKEN),
      SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN)
    ]);
  }

  static async isLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }
}