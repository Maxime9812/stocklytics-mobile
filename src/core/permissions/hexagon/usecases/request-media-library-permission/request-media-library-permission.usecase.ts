import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export const requestMediaLibraryPermissionUseCase = createAppAsyncThunk(
  'permissions/requestMediaLibraryPermission',
  async (_, { extra: { mediaLibraryPermissionGateway } }) => {
    return mediaLibraryPermissionGateway.requestPermission();
  },
);
