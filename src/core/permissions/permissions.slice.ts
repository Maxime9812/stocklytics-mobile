import { createSlice } from '@reduxjs/toolkit';
import { requestCameraPermissionUseCase } from './hexagon/usecases/request-camera-permission/request-camera-permission.usecase';
import { RootState } from '../create-store';

type PermissionsSliceState = {
  hasCameraPermission: boolean;
  hasMediaLibraryPermission: boolean;
};

const initialState: PermissionsSliceState = {
  hasCameraPermission: false,
  hasMediaLibraryPermission: false,
};

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      requestCameraPermissionUseCase.fulfilled,
      (state, action) => {
        state.hasCameraPermission = action.payload;
      },
    );
  },
});

export const selectHasCameraPermission = (state: RootState) =>
  state.permissions.hasCameraPermission;
