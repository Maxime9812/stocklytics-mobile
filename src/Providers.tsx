import { Provider } from 'react-redux';
import NavigationProvider from './navigation/NavigationProvider';
import { AppStore } from './core/create-store';
import { StatusBar } from 'expo-status-bar';
import ThemeProvider from './providers/ThemeProvider';

export default function Providers({ store }: { store: AppStore }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StatusBar style="auto" />
        <NavigationProvider />
      </ThemeProvider>
    </Provider>
  );
}
