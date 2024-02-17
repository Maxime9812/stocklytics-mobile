import { stateBuilder } from '../../core/state-builder';

import { createTestStore, EMPTY_ARGS } from '../../core/create-store';
import {
  createMediaLibraryPermissionViewModel,
  MediaLibraryPermissionViewModelStateAccessDenied,
} from './media-library-permission.viewmodel';
import { requestMediaLibraryPermissionUseCase } from '../../core/permissions/hexagon/usecases/request-media-library-permission/request-media-library-permission.usecase';

describe('MediaLibraryPermissionViewModel', () => {
  it('Should be in ready state when access is granted', () => {
    const state = stateBuilder().withMediaLibraryPermission(true).build();
    const viewModel = createMediaLibraryPermissionViewModel({
      dispatch: jest.fn(),
    })(state);

    expect(viewModel).toEqual({ type: 'ready' });
  });

  it('Should be in access-denied state when access is denied', () => {
    const state = stateBuilder().withMediaLibraryPermission(false).build();
    const viewModel = createMediaLibraryPermissionViewModel({
      dispatch: jest.fn(),
    })(state);

    expect(viewModel).toEqual(
      expect.objectContaining({ type: 'access-denied' }),
    );
  });

  it('Should call requestCameraPermissionUseCase when call requestAccess', async () => {
    const store = createTestStore();
    const viewModel = createMediaLibraryPermissionViewModel({
      dispatch: store.dispatch,
    })(store.getState());

    await (
      viewModel as MediaLibraryPermissionViewModelStateAccessDenied
    ).requestAccess();

    expect(
      store.getDispatchedUseCaseArgs(requestMediaLibraryPermissionUseCase),
    ).toEqual(EMPTY_ARGS);
  });
});
