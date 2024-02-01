import { Provider } from 'react-redux';
import NavigationProvider from './navigation/NavigationProvider';
import { AppStore } from './core/create-store';
import { StatusBar } from 'expo-status-bar';
import ThemeProvider from './providers/ThemeProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from '@gorhom/portal';

export default function Providers({ store }: { store: AppStore }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <GestureHandlerRootView className="flex-1">
          <PortalProvider>
            <StatusBar style="auto" />
            <NavigationProvider />
          </PortalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
}
