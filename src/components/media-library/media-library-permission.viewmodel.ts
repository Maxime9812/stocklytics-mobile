import { AppDispatch, RootState } from '../../core/create-store';
import { createSelector } from '@reduxjs/toolkit';
import { requestMediaLibraryPermissionUseCase } from '../../core/permissions/hexagon/usecases/request-media-library-permission/request-media-library-permission.usecase';

export type MediaLibraryPermissionViewModelStateReady = {
  type: 'ready';
};
export type MediaLibraryPermissionViewModelStateAccessDenied = {
  type: 'access-denied';
  requestAccess: () => Promise<void>;
};

type MediaLibraryPermissionViewModelState =
  | MediaLibraryPermissionViewModelStateReady
  | MediaLibraryPermissionViewModelStateAccessDenied;

export const createMediaLibraryPermissionViewModel = ({
  dispatch,
}: {
  dispatch: AppDispatch;
}): ((state: RootState) => MediaLibraryPermissionViewModelState) =>
  createSelector(
    [(state: RootState) => state.permissions.hasMediaLibraryPermission],
    (hasPermission) => {
      if (hasPermission) return { type: 'ready' };
      return {
        type: 'access-denied',
        requestAccess: async () => {
          await dispatch(requestMediaLibraryPermissionUseCase());
        },
      };
    },
  );
