import { Provider } from 'react-redux';
import RouteProvider from './routing/RouteProvider';
import { AppStore } from './core/create-store';

export default function Providers({ store }: { store: AppStore }) {
  return (
    <Provider store={store}>
      <RouteProvider />
    </Provider>
  );
}
