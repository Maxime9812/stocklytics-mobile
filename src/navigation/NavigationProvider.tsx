import {
  CompositeScreenProps,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/login/LoginScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';
import WelcomeScreen from '../screens/auth/welcome/WelcomeScreen';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ResetPasswordScreen from '../screens/auth/reset-password/ResetPasswordScreen';

export type RootStack = {
  Auth: NavigatorScreenParams<AuthStack>;
  Home: NavigatorScreenParams<HomeTabParamList>;
};

export type RootStackScreenProps<T extends keyof RootStack> =
  NativeStackScreenProps<RootStack, T>;

export type AuthStack = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ResetPassword: { email?: string } | undefined;
};

export type HomeTabParamList = {};

export type AuthStackScreenProps<T extends keyof AuthStack> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStack, T>,
    RootStackScreenProps<keyof RootStack>
  >;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStack>
  >;

const Stack = createNativeStackNavigator<AuthStack>();

export default function NavigationProvider() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerTitle: '',
          headerTransparent: true,
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
