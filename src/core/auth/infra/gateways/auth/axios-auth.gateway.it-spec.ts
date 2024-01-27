import { AxiosAuthGateway } from './axios-auth.gateway';
import axios from 'axios';
import nock from 'nock';
import { AuthUser } from '../../../hexagon/models/auth-user';

const BASE_URL = 'http://localhost';
describe('AxiosAuthGateway', () => {
  let axiosAuthGateway: AxiosAuthGateway;

  beforeEach(() => {
    axiosAuthGateway = new AxiosAuthGateway(
      axios.create({ baseURL: BASE_URL }),
    );
    nock(BASE_URL).get('/auth/me').reply(200);
  });
  describe('login', () => {
    it('Should return user', async () => {
      nock(BASE_URL)
        .post('/auth/login', {
          email: 'john.doe@gmail.com',
          password: '123456',
        })
        .reply(201, { id: 'user-id', email: 'john.doe@gmail.com' });

      const user = await axiosAuthGateway.login({
        email: 'john.doe@gmail.com',
        password: '123456',
      });

      expect(user).toEqual({ id: 'user-id', email: 'john.doe@gmail.com' });
    });

    it('Should call onAuthStateChanged', async () => {
      nock(BASE_URL)
        .post('/auth/login', {
          email: 'john.doe@gmail.com',
          password: '123456',
        })
        .reply(201, { id: 'user-id', email: 'john.doe@gmail.com' });
      let user: AuthUser | undefined;

      axiosAuthGateway.onAuthStateChanged((_user) => {
        user = _user;
      });

      await axiosAuthGateway.login({
        email: 'john.doe@gmail.com',
        password: '123456',
      });

      expect(user).toEqual({ id: 'user-id', email: 'john.doe@gmail.com' });
    });

    it('Should return undefined when credentials are wrong', async () => {
      nock(BASE_URL)
        .post('/auth/login', {
          email: 'john.doe@gmail.com',
          password: 'wrong-123456',
        })
        .reply(403);

      const user = await axiosAuthGateway.login({
        email: 'john.doe@gmail.com',
        password: '123456',
      });

      expect(user).toEqual(undefined);
    });
  });

  describe('logout', () => {
    it('Should call logout', async () => {
      const scope = nock(BASE_URL).post('/auth/logout').reply(200);
      await axiosAuthGateway.logout();
      expect(scope.isDone()).toEqual(true);
    });
    it('Should call onAuthStateChanged', async () => {
      nock(BASE_URL).post('/auth/logout').reply(200);
      let stateChangedCalled = false;

      axiosAuthGateway.onAuthStateChanged(() => {
        stateChangedCalled = true;
      });

      await axiosAuthGateway.logout();

      expect(stateChangedCalled).toBeTruthy();
    });
  });

  describe('register', () => {
    it('Should return user', async () => {
      nock(BASE_URL)
        .post('/auth/register', {
          fullName: 'John Doe',
          email: 'john.doe@gmail.com',
          password: '123456',
        })
        .reply(201, {
          id: 'user-id',
          email: 'john.doe@gmail.com',
        });

      const user = await axiosAuthGateway.register({
        fullName: 'John Doe',
        email: 'john.doe@gmail.com',
        password: '123456',
      });

      expect(user).toEqual({
        id: 'user-id',
        email: 'john.doe@gmail.com',
      });
    });
  });
});
