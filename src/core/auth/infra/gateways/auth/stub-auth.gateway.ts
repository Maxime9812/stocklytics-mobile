import {
  AuthGateway,
  LoginPayload,
} from '../../../hexagon/gateways/auth.gateway';
import { AuthUser } from '../../../hexagon/models/auth-user';

export type UserWithCredentials = {
  credentials: LoginPayload;
  user: AuthUser;
};

export class StubAuthGateway implements AuthGateway {
  private userForLogin: Map<string, AuthUser> = new Map();
  private onAuthStateChangedCallback:
    | ((user: AuthUser | undefined) => void)
    | undefined;
  private _logoutWasCalled: boolean = false;

  get logoutWasCalled(): boolean {
    return this._logoutWasCalled;
  }

  constructor(private readonly delay: number = 0) {}

  onAuthStateChanged(callback: (user: AuthUser | undefined) => void): void {
    this.onAuthStateChangedCallback = callback;
  }

  async login(payload: LoginPayload): Promise<AuthUser | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.userForLogin.get(this.credentialsToString(payload));
        resolve(user);
      }, this.delay);
    });
  }

  logout(): Promise<void> {
    this._logoutWasCalled = true;
    return Promise.resolve(undefined);
  }

  simulateAuthStateChanged(user: AuthUser | undefined) {
    this.onAuthStateChangedCallback?.(user);
  }

  givenUserWithCredentials(userWithCredentials: UserWithCredentials) {
    this.userForLogin.set(
      this.credentialsToString(userWithCredentials.credentials),
      userWithCredentials.user,
    );
  }

  private credentialsToString(credentials: LoginPayload): string {
    return `${credentials.email}:${credentials.password}`;
  }
}
