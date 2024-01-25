import Providers from './src/Providers';
import { createStore } from './src/core/create-store';
import { StubAuthGateway } from './src/core/auth/infra/gateways/auth/stub-auth.gateway';
import { stateBuilder } from './src/core/state-builder';
import { AsyncStorageAuthGateway } from './src/core/auth/infra/gateways/auth/async-storage-auth.gateway';
import axios from 'axios';
import { AxiosAuthGateway } from './src/core/auth/infra/gateways/auth/axios-auth.gateway';

const stubAuthGateway = new StubAuthGateway(2000);
stubAuthGateway.givenUserWithCredentials({
  credentials: {
    email: 'john.doe@gmail.com',
    password: '123456',
  },
  user: {
    id: 'user-id',
    email: 'john.doe@gmail.com',
  },
});
const authGateway = new AsyncStorageAuthGateway(stubAuthGateway);
const axiosInstance = axios.create({
  baseURL: 'http://192.168.5.55:3000',
  withCredentials: true,
});
const axiosAuthGateway = new AxiosAuthGateway(axiosInstance);

const store = createStore({ authGateway }, stateBuilder().build());

export default function App() {
  return <Providers store={store} />;
}
