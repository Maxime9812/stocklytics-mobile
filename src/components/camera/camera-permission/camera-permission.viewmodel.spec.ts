import { createCameraPermissionViewModel } from './camera-permission.viewmodel';

describe('CameraPermissionViewModel', () => {
  it('Should be in ready state when access is granted', () => {
    const viewModel = createCameraPermissionViewModel({
      hasPermission: true,
    });

    expect(viewModel).toEqual({ type: 'ready' });
  });

  it('Should be in access-denied state when access is denied', () => {
    const viewModel = createCameraPermissionViewModel({
      hasPermission: false,
    });

    expect(viewModel).toEqual({ type: 'access-denied' });
  });
});