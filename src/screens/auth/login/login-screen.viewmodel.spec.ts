import { createLoginScreenViewModel } from './login-screen.viewmodel';
import { createTestStore } from '../../../core/create-store';
import { loginUseCase } from '../../../core/auth/hexagon/usecases/login/login.usecase';

describe('LoginScreenViewModel', () => {
  describe('login', () => {
    it('Should call login use case when login is called', async () => {
      const store = createTestStore();
      const { login } = createLoginScreenViewModel(store.dispatch)();
      await login({
        email: 'john.doe@gmail.com',
        password: '123456',
      });
      expect(store.getDispatchedUseCaseArgs(loginUseCase)).toEqual({
        email: 'john.doe@gmail.com',
        password: '123456',
      });
    });
  });
});
