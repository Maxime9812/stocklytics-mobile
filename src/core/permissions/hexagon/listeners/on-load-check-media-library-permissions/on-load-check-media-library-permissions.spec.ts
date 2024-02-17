import { createTestStore } from '../../../../create-store';
import { onLoadCheckMediaLibraryPermissions } from './on-load-check-media-library-permissions';
import { stateBuilder } from '../../../../state-builder';
import { StubMediaLibraryPermissionGateway } from '../../../infra/gateways/media-library/stub-media-library-permission.gateway';

describe('On load check media library permissions', () => {
  it('Should add media library permission in the store', async () => {
    const mediaLibraryPermissionGateway =
      new StubMediaLibraryPermissionGateway();
    mediaLibraryPermissionGateway.givenHasPermission(true);

    const store = createTestStore({ mediaLibraryPermissionGateway });

    await onLoadCheckMediaLibraryPermissions({
      dispatch: store.dispatch,
      mediaLibraryPermissionGateway,
    });

    expect(store.getState()).toEqual(
      stateBuilder().withMediaLibraryPermission(true).build(),
    );
  });
});
