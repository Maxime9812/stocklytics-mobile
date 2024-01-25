import Providers from './src/Providers';
import { createStore } from './src/core/create-store';
import { StubAuthGateway } from './src/core/auth/infra/gateways/stub-auth.gateway';
import { stateBuilder } from './src/core/state-builder';
import { AsyncStorageAuthGateway } from './src/core/auth/infra/gateways/async-storage-auth.gateway';

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

const store = createStore({ authGateway }, stateBuilder().build());

export default function App() {
  return <Providers store={store} />;
}
