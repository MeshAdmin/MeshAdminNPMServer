import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    role: string;
  };
  token?: string;
  message?: string;
}

class AuthService {
  private token: string | null = null;

  constructor() {
    // Check for stored token on initialization
    this.token = localStorage.getItem('authToken');
    if (this.token) {
      this.setAuthHeader(this.token);
    }
  }

  private setAuthHeader(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  private removeAuthHeader() {
    delete axios.defaults.headers.common['Authorization'];
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);

      if (response.data.success && response.data.token) {
        this.token = response.data.token;
        localStorage.setItem('authToken', this.token);
        this.setAuthHeader(this.token);
      }

      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  }

  async logout(): Promise<void> {
    try {
      if (this.token) {
        await axios.post(`${API_BASE_URL}/auth/logout`);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.token = null;
      localStorage.removeItem('authToken');
      this.removeAuthHeader();
    }
  }

  async getCurrentUser() {
    try {
      if (!this.token) return null;

      const response = await axios.get(`${API_BASE_URL}/auth/me`);
      return response.data.user;
    } catch (error) {
      console.error('Get current user error:', error);
      // Token might be invalid, clear it
      this.logout();
      return null;
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`);

      if (response.data.success && response.data.token) {
        this.token = response.data.token;
        localStorage.setItem('authToken', this.token);
        this.setAuthHeader(this.token);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
      return false;
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}

export const authService = new AuthService();
export default authService;
