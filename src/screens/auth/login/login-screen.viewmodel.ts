import { AppDispatch } from '../../../core/create-store';
import {
  loginUseCase,
  LoginUseCasePayload,
} from '../../../core/auth/hexagon/usecases/login/login.usecase';

export const createLoginScreenViewModel = (dispatch: AppDispatch) => () => {
  const login = async (payload: LoginUseCasePayload) => {
    await dispatch(loginUseCase(payload));
  };
  return { login };
};
