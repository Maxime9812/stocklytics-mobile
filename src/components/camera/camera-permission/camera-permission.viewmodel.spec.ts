import {
  CameraPermissionViewModelStateAccessDenied,
  createCameraPermissionViewModel,
} from './camera-permission.viewmodel';
import { stateBuilder } from '../../../core/state-builder';
import { createTestStore, EMPTY_ARGS } from '../../../core/create-store';
import { requestCameraPermissionUseCase } from '../../../core/permissions/hexagon/usecases/request-camera-permission/request-camera-permission.usecase';

describe('CameraPermissionViewModel', () => {
  it('Should be in ready state when access is granted', () => {
    const state = stateBuilder().withCameraPermission(true).build();
    const viewModel = createCameraPermissionViewModel({
      dispatch: jest.fn(),
    })(state);

    expect(viewModel).toEqual({ type: 'ready' });
  });

  it('Should be in access-denied state when access is denied', () => {
    const state = stateBuilder().withCameraPermission(false).build();
    const viewModel = createCameraPermissionViewModel({
      dispatch: jest.fn(),
    })(state);

    expect(viewModel).toEqual(
      expect.objectContaining({ type: 'access-denied' }),
    );
  });

  it('Should call requestCameraPermissionUseCase when call requestAccess', async () => {
    const store = createTestStore();
    const viewModel = createCameraPermissionViewModel({
      dispatch: store.dispatch,
    })(store.getState());

    await (
      viewModel as CameraPermissionViewModelStateAccessDenied
    ).requestAccess();

    expect(
      store.getDispatchedUseCaseArgs(requestCameraPermissionUseCase),
    ).toEqual(EMPTY_ARGS);
  });
});
