import Providers from './src/Providers';
import { createStore } from './src/core/create-store';
import { StubAuthGateway } from './src/core/auth/infra/gateways/stub-auth.gateway';

const authGateway = new StubAuthGateway();
authGateway.givenUserWithCredentials({
  credentials: {
    email: 'john.doe@gmail.com',
    password: '123456',
  },
  user: {
    id: 'user-id',
    email: 'john.doe@gmail.com',
  },
});

const store = createStore({ authGateway });

export default function App() {
  return <Providers store={store} />;
}
