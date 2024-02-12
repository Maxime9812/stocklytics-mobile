export type CameraPermissionViewModelParams = {
  hasPermission?: boolean;
};

export type CameraPermissionViewModelStateReady = {
  type: 'ready';
};
type CameraPermissionViewModelStateAccessDenied = {
  type: 'access-denied';
};

type CameraPermissionViewModelState =
  | CameraPermissionViewModelStateReady
  | CameraPermissionViewModelStateAccessDenied;

export const createCameraPermissionViewModel = ({
  hasPermission,
}: CameraPermissionViewModelParams): CameraPermissionViewModelState => {
  if (!hasPermission) {
    return { type: 'access-denied' };
  }
  return { type: 'ready' };
};
