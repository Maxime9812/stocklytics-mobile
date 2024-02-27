import { Provider } from 'react-redux';
import NavigationProvider from './navigation/NavigationProvider';
import { AppStore } from './core/create-store';
import { StatusBar } from 'expo-status-bar';
import ThemeProvider from './providers/ThemeProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from '@gorhom/portal';
import TranslationProvider from './providers/TranslationProvider';
import { TranslationGateway } from './core/translations/hexagon/gateways/translation.gateway';

export default function Providers({
  store,
  translationGateway,
}: {
  store: AppStore;
  translationGateway: TranslationGateway;
}) {
  return (
    <Provider store={store}>
      <TranslationProvider translationGateway={translationGateway}>
        <ThemeProvider>
          <GestureHandlerRootView className="flex-1">
            <PortalProvider>
              <StatusBar style="auto" />
              <NavigationProvider />
            </PortalProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </TranslationProvider>
    </Provider>
  );
}
