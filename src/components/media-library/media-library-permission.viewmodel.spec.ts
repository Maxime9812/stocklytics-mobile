import { stateBuilder } from '../../core/state-builder';

import { createTestStore, EMPTY_ARGS } from '../../core/create-store';
import {
  createMediaLibraryPermissionViewModel,
  MediaLibraryPermissionViewModelStateAccessDenied,
} from './media-library-permission.viewmodel';
import { requestMediaLibraryPermissionUseCase } from '../../core/permissions/hexagon/usecases/request-media-library-permission/request-media-library-permission.usecase';

describe('MediaLibraryPermissionViewModel', () => {
  it('Should be in ready state when access is not granted but always rend mode is active', () => {
    const state = stateBuilder().withMediaLibraryPermission(false).build();
    const viewModel = createMediaLibraryPermissionViewModel({
      dispatch: jest.fn(),
      alwaysRender: true,
    })(state);

    expect(viewModel).toEqual({ type: 'ready', hasPermission: false });
  });

  it('Should be in ready state when access is granted', () => {
    const state = stateBuilder().withMediaLibraryPermission(true).build();
    const viewModel = createMediaLibraryPermissionViewModel({
      dispatch: jest.fn(),
      alwaysRender: false,
    })(state);

    expect(viewModel).toEqual({ type: 'ready', hasPermission: true });
  });

  it('Should be in access-denied state when access is denied', () => {
    const state = stateBuilder().withMediaLibraryPermission(false).build();
    const viewModel = createMediaLibraryPermissionViewModel({
      dispatch: jest.fn(),
      alwaysRender: false,
    })(state);

    expect(viewModel).toEqual(
      expect.objectContaining({ type: 'access-denied' }),
    );
  });

  it('Should call requestCameraPermissionUseCase when call requestAccess', async () => {
    const store = createTestStore();
    const viewModel = createMediaLibraryPermissionViewModel({
      dispatch: store.dispatch,
      alwaysRender: false,
    })(store.getState());

    await (
      viewModel as MediaLibraryPermissionViewModelStateAccessDenied
    ).requestAccess();

    expect(
      store.getDispatchedUseCaseArgs(requestMediaLibraryPermissionUseCase),
    ).toEqual(EMPTY_ARGS);
  });
});
