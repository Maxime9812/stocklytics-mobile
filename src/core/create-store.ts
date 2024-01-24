import { Action, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { AuthGateway } from './auth/hexagon/gateways/auth.gateway';

export type Dependencies = {
  authGateway: AuthGateway;
};

export const createStore = (
  dependencies: Dependencies,
  preloadedState: Partial<RootState> = {},
) => {
  return configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }),
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action<any>>;
export type RootState = ReturnType<typeof rootReducer>;
