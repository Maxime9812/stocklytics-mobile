import { NavigationContainer } from '@react-navigation/native';

import AuthStackNavigation, { AuthStackNavigator } from './AuthStackNavigation';
import HomeNavigation, { HomeTabNavigator } from './HomeNavigation';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type RootStack = {
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
        initialRouteName="Auth"
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Auth" component={AuthStackNavigation} />
        <RootStack.Screen name="Home" component={HomeNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
