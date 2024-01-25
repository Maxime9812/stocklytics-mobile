import { NavigationContainer } from '@react-navigation/native';

import AuthStackNavigation, { AuthStackNavigator } from './AuthStackNavigation';
import HomeNavigation, { HomeTabNavigator } from './HomeNavigation';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';

export type RootStack = {
  Splash: undefined;
  Auth: AuthStackNavigator;
  Home: HomeTabNavigator;
};

export type RootStackScreenProps<T extends keyof RootStack> =
  NativeStackScreenProps<RootStack, T>;

const RootStack = createNativeStackNavigator<RootStack>();

export default function NavigationProvider() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="Auth" component={AuthStackNavigation} />
        <RootStack.Screen name="Home" component={HomeNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
