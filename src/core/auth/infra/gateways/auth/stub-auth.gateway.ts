import {
  AuthGateway,
  LoginPayload,
  RegisterPayload,
} from '../../../hexagon/gateways/auth.gateway';
import { AuthUser } from '../../../hexagon/models/auth-user';

export type UserWithCredentials = {
  credentials: LoginPayload;
  user: AuthUser;
};

export type UserWithRegistration = {
  registration: RegisterPayload;
  user: AuthUser;
};

export class StubAuthGateway implements AuthGateway {
  private userForLogin: Map<string, AuthUser> = new Map();
  private userForRegister: Map<string, AuthUser> = new Map();
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

  async logout(): Promise<void> {
    this._logoutWasCalled = true;
  }

  async register(payload: RegisterPayload): Promise<AuthUser | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.userForRegister.get(
          this.registrationToString(payload),
        );
        resolve(user);
      }, this.delay);
    });
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

  givenUserRegistered(userWithRegistration: UserWithRegistration) {
    this.userForRegister.set(
      this.registrationToString(userWithRegistration.registration),
      userWithRegistration.user,
    );
  }

  private registrationToString(registration: RegisterPayload): string {
    return JSON.stringify(registration);
  }

  private credentialsToString(credentials: LoginPayload): string {
    return `${credentials.email}:${credentials.password}`;
  }
}
