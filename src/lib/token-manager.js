const ACCESS_TOKEN_KEY = 'access_token';

export class TokenManager {
  static storeToken({ access_token }) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
  }
  static getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  static clearToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}
