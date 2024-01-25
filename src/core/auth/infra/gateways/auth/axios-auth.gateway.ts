import {
  AuthGateway,
  LoginPayload,
} from '../../../hexagon/gateways/auth.gateway';
import { AuthUser } from '../../../hexagon/models/auth-user';
import { AxiosInstance } from 'axios';

export class AxiosAuthGateway implements AuthGateway {
  private _onAuthStateChangedCallback:
    | ((user: AuthUser | undefined) => void)
    | undefined;
  constructor(private readonly axios: AxiosInstance) {}

  async login(payload: LoginPayload): Promise<AuthUser | undefined> {
    try {
      const response = await this.axios.post<AuthUser>('/auth/login', payload);
      const user = response.data;
      this._onAuthStateChangedCallback?.(user);
      return user;
    } catch (e) {
      this._onAuthStateChangedCallback?.(undefined);
      return undefined;
    }
  }

  async logout(): Promise<void> {
    await this.axios.post('/auth/logout');
    this._onAuthStateChangedCallback?.(undefined);
  }

  onAuthStateChanged(callback: (user: AuthUser | undefined) => void): void {
    this._onAuthStateChangedCallback = callback;
    void this.checkIfUserIsLoggedIn();
  }

  private async checkIfUserIsLoggedIn() {
    try {
      const response = await this.axios.get<AuthUser>('/auth/me');
      const user = response.data;
      this._onAuthStateChangedCallback?.(user);
    } catch (e) {
      this._onAuthStateChangedCallback?.(undefined);
    }
  }
}
