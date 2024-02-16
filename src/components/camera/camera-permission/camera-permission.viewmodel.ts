import { createSelector } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../../core/create-store';
import { selectHasCameraPermission } from '../../../core/permissions/permissions.slice';
import { requestCameraPermissionUseCase } from '../../../core/permissions/hexagon/usecases/request-camera-permission/request-camera-permission.usecase';

export type CameraPermissionViewModelParams = {
  dispatch: AppDispatch;
};

export type CameraPermissionViewModelStateReady = {
  type: 'ready';
};
export type CameraPermissionViewModelStateAccessDenied = {
  type: 'access-denied';
  requestAccess: () => Promise<void>;
};

type CameraPermissionViewModelState =
  | CameraPermissionViewModelStateReady
  | CameraPermissionViewModelStateAccessDenied;

export const createCameraPermissionViewModel = ({
  dispatch,
}: CameraPermissionViewModelParams): ((
  state: RootState,
) => CameraPermissionViewModelState) =>
  createSelector([selectHasCameraPermission], (hasPermission) => {
    if (hasPermission) {
      return { type: 'ready' };
    }

    return {
      type: 'access-denied',
      requestAccess: async () => {
        await dispatch(requestCameraPermissionUseCase());
      },
    };
  });
