import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export const logoutUseCase = createAppAsyncThunk(
  'auth/logout',
  async (_, { extra: { authGateway } }) => {
    return authGateway.logout();
  },
);
