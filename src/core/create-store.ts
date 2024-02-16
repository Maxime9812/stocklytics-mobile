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
import { ItemsGateway } from './items/hexagon/gateways/items.gateway';
import { StubItemsGateway } from './items/infra/gateways/items-gateway/stub-items.gateway';
import { FoldersGateway } from './folders/hexagon/gateways/folders.gateway';
import { StubFoldersGateway } from './folders/infra/gateways/stub-folders.gateway';
import { UUIDProvider } from './common/uuid-provider/UUIDProvider';
import { DeterministicUUIDProvider } from './common/uuid-provider/deterministic-uuid.provider';
import { AsyncThunk } from '@reduxjs/toolkit';
import { ScannerGateway } from './scanner/hexagon/gateways/scannerGateway';
import { StubScannerGateway } from './scanner/infra/gateways/stub-scanner.gateway';
import { CameraPermissionGateways } from './permissions/hexagon/gateways/camera-permission.gateways';
import { StubCameraPermissionGateway } from './permissions/infra/gateways/camera/stub-camera-permission.gateway';

export type Dependencies = {
  authGateway: AuthGateway;
  itemsGateway: ItemsGateway;
  foldersGateway: FoldersGateway;
  uuidProvider: UUIDProvider;
  scannerGateway: ScannerGateway;
  cameraPermissionGateway: CameraPermissionGateways;
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
    foldersGateway = new StubFoldersGateway(),
    uuidProvider = new DeterministicUUIDProvider(),
    scannerGateway = new StubScannerGateway(),
    cameraPermissionGateway = new StubCameraPermissionGateway(),
  }: Partial<Dependencies> = {},
  preloadedState: Partial<RootState> = {},
) => {
  const actions: Action<any>[] = [];

  const logActionsMiddleware: Middleware = () => (next) => (action) => {
    actions.push(action as Action<any>);
    return next(action);
  };
  const getAction = () => actions;

  const store = createStore(
    {
      authGateway,
      itemsGateway,
      foldersGateway,
      uuidProvider,
      scannerGateway,
      cameraPermissionGateway,
    },
    preloadedState,
    [logActionsMiddleware],
  );
  const getDispatchedUseCaseArgs = (useCase: AsyncThunk<any, any, any>) => {
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
