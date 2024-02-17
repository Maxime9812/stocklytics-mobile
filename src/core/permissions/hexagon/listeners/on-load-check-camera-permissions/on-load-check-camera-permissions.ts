import { AppDispatch } from '../../../../create-store';
import { CameraPermissionGateway } from '../../gateways/camera-permission.gateway';
import { onCameraPermissionChange } from '../../../permissions.slice';

export const onLoadCheckCameraPermissions = async ({
  dispatch,
  cameraPermissionGateway,
}: {
  dispatch: AppDispatch;
  cameraPermissionGateway: CameraPermissionGateway;
}) => {
  const hasPermission = await cameraPermissionGateway.checkPermission();
  dispatch(onCameraPermissionChange(hasPermission));
};
