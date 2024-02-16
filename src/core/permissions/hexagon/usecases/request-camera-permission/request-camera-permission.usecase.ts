import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export const requestCameraPermissionUseCase = createAppAsyncThunk(
  'permissions/requestCameraPermission',
  async (_, { extra: { cameraPermissionGateway } }) => {
    return cameraPermissionGateway.requestPermission();
  },
);
