import { createTestStore } from '../../../../create-store';
import { StubCameraPermissionGateway } from '../../../infra/gateways/camera/stub-camera-permission.gateway';
import { onLoadCheckCameraPermissions } from './on-load-check-camera-permissions';
import { stateBuilder } from '../../../../state-builder';

describe('On load check camera permissions', () => {
  it('Should add camera permission in the store', async () => {
    const cameraPermissionGateway = new StubCameraPermissionGateway();
    cameraPermissionGateway.givenHasPermission(true);

    const store = createTestStore({ cameraPermissionGateway });

    await onLoadCheckCameraPermissions({
      dispatch: store.dispatch,
      cameraPermissionGateway,
    });

    expect(store.getState()).toEqual(
      stateBuilder().withCameraPermission(true).build(),
    );
  });
});
