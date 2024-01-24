import { Provider } from 'react-redux';
import NavigationProvider from './navigation/NavigationProvider';
import { AppStore } from './core/create-store';

export default function Providers({ store }: { store: AppStore }) {
  return (
    <Provider store={store}>
      <NavigationProvider />
    </Provider>
  );
}
