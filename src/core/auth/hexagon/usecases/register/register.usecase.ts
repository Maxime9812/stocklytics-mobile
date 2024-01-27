import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type RegisterUseCasePayload = {
  fullName: string;
  email: string;
  password: string;
};

export const registerUseCase = createAppAsyncThunk(
  'auth/register',
  async (payload: RegisterUseCasePayload, { extra: { authGateway } }) => {
    return await authGateway.register(payload);
  },
);
