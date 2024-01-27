import {
  AuthGateway,
  LoginPayload,
  RegisterPayload,
} from '../../../hexagon/gateways/auth.gateway';
import { AuthUser } from '../../../hexagon/models/auth-user';
import { StubAuthGateway } from './stub-auth.gateway';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_USER_KEY = 'AUTH_USER';

export class AsyncStorageAuthGateway implements AuthGateway {
  constructor(private readonly authGateway: StubAuthGateway) {}

  async register(payload: RegisterPayload): Promise<AuthUser | undefined> {
    const user = await this.authGateway.register(payload);
    if (!user) return undefined;
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    return user;
  }

  async login(payload: LoginPayload): Promise<AuthUser | undefined> {
    const user = await this.authGateway.login(payload);
    if (!user) return undefined;
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    return user;
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(AUTH_USER_KEY);
    return this.authGateway.logout();
  }

  onAuthStateChanged(callback: (user: AuthUser | undefined) => void): void {
    this.authGateway.onAuthStateChanged(callback);
    void this.checkIfUserIsLoggedIn();
  }

  private async checkIfUserIsLoggedIn() {
    const user = await AsyncStorage.getItem(AUTH_USER_KEY);
    this.authGateway.simulateAuthStateChanged(
      user ? JSON.parse(user) : undefined,
    );
  }
}
