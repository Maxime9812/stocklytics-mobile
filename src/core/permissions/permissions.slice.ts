import { createAction, createSlice } from '@reduxjs/toolkit';
import { requestCameraPermissionUseCase } from './hexagon/usecases/request-camera-permission/request-camera-permission.usecase';
import { RootState } from '../create-store';
import { requestMediaLibraryPermissionUseCase } from './hexagon/usecases/request-media-library-permission/request-media-library-permission.usecase';

type PermissionsSliceState = {
  hasCameraPermission: boolean;
  hasMediaLibraryPermission: boolean;
};

const initialState: PermissionsSliceState = {
  hasCameraPermission: false,
  hasMediaLibraryPermission: false,
};

export const onCameraPermissionChange = createAction<boolean>(
  'permissions/cameraPermissionChange',
);

export const onMediaLibraryPermissionChange = createAction<boolean>(
  'permissions/mediaLibraryPermissionChange',
);

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestCameraPermissionUseCase.fulfilled, (state, action) => {
        state.hasCameraPermission = action.payload;
      })
      .addCase(
        requestMediaLibraryPermissionUseCase.fulfilled,
        (state, action) => {
          state.hasMediaLibraryPermission = action.payload;
        },
      )
      .addCase(onCameraPermissionChange, (state, action) => {
        state.hasCameraPermission = action.payload;
      })
      .addCase(onMediaLibraryPermissionChange, (state, action) => {
        state.hasMediaLibraryPermission = action.payload;
      });
  },
});

export const selectHasCameraPermission = (state: RootState) =>
  state.permissions.hasCameraPermission;
