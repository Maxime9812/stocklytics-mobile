import {
  StubAuthGateway,
  UserWithCredentials,
} from '../../infra/gateways/auth/stub-auth.gateway';
import { AppStore, createTestStore } from '../../../create-store';
import {
  loginUseCase,
  LoginUseCasePayload,
} from '../usecases/login/login.usecase';
import { AuthUser } from '../models/auth-user';
import { stateBuilder } from '../../../state-builder';
import { logoutUseCase } from '../usecases/logout/logout.usecase';

export const createAuthFixture = () => {
  const authGateway = new StubAuthGateway();
  let store: AppStore;

  return {
    givenUserCredentials: (userWithCredentials: UserWithCredentials) => {
      authGateway.givenUserWithCredentials(userWithCredentials);
    },
    whenAuthStateChanged: (authUser: AuthUser) => {
      store = createTestStore({ authGateway });
      authGateway.simulateAuthStateChanged(authUser);
    },
    whenLogin: (payload: LoginUseCasePayload) => {
      store = createTestStore({ authGateway });
      return store.dispatch(loginUseCase(payload));
    },
    whenLogout: () => {
      store = createTestStore({ authGateway });
      return store.dispatch(logoutUseCase());
    },
    thenUserIsLoggedInAs: (authUser: AuthUser) => {
      expect(store.getState()).toEqual(
        stateBuilder().withAuthUser(authUser).build(),
      );
    },
    thenUserIsNotLoggedIn: () => {
      expect(store.getState()).toEqual(
        stateBuilder().withAuthUser(undefined).build(),
      );
    },
    thenLogoutWasCalled: () => {
      expect(authGateway.logoutWasCalled).toBeTruthy();
    },
  };
};

export type AuthFixture = ReturnType<typeof createAuthFixture>;
