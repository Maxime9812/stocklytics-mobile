import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type LoginUseCasePayload = {
  email: string;
  password: string;
};

export const loginUseCase = createAppAsyncThunk(
  'aut/login',
  async (
    payload: LoginUseCasePayload,
    { extra: { authGateway }, rejectWithValue },
  ) => {
    const user = await authGateway.login(payload);
    if (!user) {
      return rejectWithValue('Invalid credentials');
    }
    return user;
  },
);
