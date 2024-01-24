import Providers from './src/Providers';
import { createStore } from './src/core/create-store';
import { StubAuthGateway } from './src/core/auth/infra/gateways/stub-auth.gateway';

const authGateway = new StubAuthGateway();

const store = createStore({ authGateway });

export default function App() {
  return <Providers store={store} />;
}
