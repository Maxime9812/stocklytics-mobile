import { AppDispatch } from '../../../../create-store';
import { MediaLibraryPermissionGateway } from '../../gateways/media-library-permission.gateway';
import { onMediaLibraryPermissionChange } from '../../../permissions.slice';

export const onLoadCheckMediaLibraryPermissions = async ({
  dispatch,
  mediaLibraryPermissionGateway,
}: {
  dispatch: AppDispatch;
  mediaLibraryPermissionGateway: MediaLibraryPermissionGateway;
}) => {
  const hasPermission = await mediaLibraryPermissionGateway.checkPermission();
  dispatch(onMediaLibraryPermissionChange(hasPermission));
};
