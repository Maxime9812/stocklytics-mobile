import { AppDispatch } from '../../../core/create-store';
import {
  loginUseCase,
  LoginUseCasePayload,
} from '../../../core/auth/hexagon/usecases/login/login.usecase';

export const createLoginScreenViewModel = (dispatch: AppDispatch) => () => {
  const login = async (payload: LoginUseCasePayload) => {
    return dispatch(loginUseCase(payload));
  };
  return { login };
};
