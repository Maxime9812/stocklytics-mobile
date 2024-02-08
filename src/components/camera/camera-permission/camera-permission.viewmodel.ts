export type CameraPermissionViewModelParams = {
  hasPermission?: boolean;
};

export type CameraPermissionViewModelStateReady = {
  type: 'ready';
};
type CameraPermissionViewModelStateRequestAccess = {
  type: 'request-access';
};
type CameraPermissionViewModelStateAccessDenied = {
  type: 'access-denied';
};

type CameraPermissionViewModelState =
  | CameraPermissionViewModelStateReady
  | CameraPermissionViewModelStateRequestAccess
  | CameraPermissionViewModelStateAccessDenied;

export const createCameraPermissionViewModel = ({
  hasPermission,
}: CameraPermissionViewModelParams): CameraPermissionViewModelState => {
  if (hasPermission === undefined) {
    return { type: 'request-access' };
  }

  if (!hasPermission) {
    return { type: 'access-denied' };
  }
  return { type: 'ready' };
};
