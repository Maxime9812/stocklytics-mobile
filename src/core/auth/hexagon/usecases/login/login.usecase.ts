import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type LoginUseCasePayload = {
  email: string;
  password: string;
};

export const loginUseCase = createAppAsyncThunk(
  'aut/login',
  async (payload: LoginUseCasePayload, { extra: { authGateway } }) => {},
);
