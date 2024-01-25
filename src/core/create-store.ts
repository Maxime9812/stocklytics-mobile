import { Action, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { AuthGateway } from './auth/hexagon/gateways/auth.gateway';
import { StubAuthGateway } from './auth/infra/gateways/stub-auth.gateway';
import { onAuthStateChangeListener } from './auth/hexagon/listeners/on-auth-state-change.listener';

export type Dependencies = {
  authGateway: AuthGateway;
};

export const createStore = (
  dependencies: Dependencies,
  preloadedState: Partial<RootState> = {},
) => {
  const store = configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }),
  });

  onAuthStateChangeListener(store, dependencies.authGateway);

  return store;
};

export const createTestStore = ({
  authGateway = new StubAuthGateway(),
}: Partial<Dependencies> = {}) => {
  return createStore({
    authGateway,
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action<any>>;
export type RootState = ReturnType<typeof rootReducer>;
