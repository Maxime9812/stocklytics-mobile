import {
  Action,
  configureStore,
  isAsyncThunkAction,
  Middleware,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { AuthGateway } from './auth/hexagon/gateways/auth.gateway';
import { StubAuthGateway } from './auth/infra/gateways/auth/stub-auth.gateway';
import { onAuthStateChangeListener } from './auth/hexagon/listeners/on-auth-state-change.listener';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { ItemsGateway } from './items/hexagon/gateways/items.gateway';
import { StubItemsGateway } from './items/infra/gateways/stub-items.gateway';

export type Dependencies = {
  authGateway: AuthGateway;
  itemsGateway: ItemsGateway;
};

export const EMPTY_ARGS = 'EMPTY_ARGS' as const;

export const createStore = (
  dependencies: Dependencies,
  preloadedState: Partial<RootState> = {},
  middleware: Middleware[] = [],
) => {
  const store = configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }).concat(middleware),
  });

  onAuthStateChangeListener(store, dependencies.authGateway);

  return store;
};

export const createTestStore = (
  {
    authGateway = new StubAuthGateway(),
    itemsGateway = new StubItemsGateway(),
  }: Partial<Dependencies> = {},
  preloadedState: Partial<RootState> = {},
) => {
  const actions: Action<any>[] = [];

  const logActionsMiddleware: Middleware = () => (next) => (action) => {
    actions.push(action as Action<any>);
    return next(action);
  };
  const getAction = () => actions;

  const store = createStore({ authGateway, itemsGateway }, preloadedState, [
    logActionsMiddleware,
  ]);
  const getDispatchedUseCaseArgs = (useCase: AnyAsyncThunk) => {
    const pendingUseCaseAction = getAction().find(
      (a) => a.type == useCase.pending.toString(),
    );

    if (!pendingUseCaseAction) return;

    if (!isAsyncThunkAction(pendingUseCaseAction)) return;

    return pendingUseCaseAction.meta.arg ?? EMPTY_ARGS;
  };
  return {
    ...store,
    getAction,
    getDispatchedUseCaseArgs,
  };
};

export type TestStore = ReturnType<typeof createTestStore>;

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action<any>>;
export type RootState = ReturnType<typeof rootReducer>;
