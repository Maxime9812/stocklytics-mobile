import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type RegisterUseCasePayload = {
  fullName: string;
  email: string;
  password: string;
};

export const registerUseCase = createAppAsyncThunk(
  'auth/register',
  async (
    payload: RegisterUseCasePayload,
    { extra: { authGateway }, rejectWithValue },
  ) => {
    const user = await authGateway.register(payload);
    if (!user) return rejectWithValue('User not found');
    return user;
  },
);
