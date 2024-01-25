import { Provider } from 'react-redux';
import NavigationProvider from './navigation/NavigationProvider';
import { AppStore } from './core/create-store';
import { StatusBar } from 'expo-status-bar';

export default function Providers({ store }: { store: AppStore }) {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <NavigationProvider />
    </Provider>
  );
}
