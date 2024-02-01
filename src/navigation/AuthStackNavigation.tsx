import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RootStack, RootStackScreenProps } from './NavigationProvider';
import WelcomeScreen from '../screens/auth/welcome/WelcomeScreen';
import LoginScreen from '../screens/auth/login/LoginScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';
import ResetPasswordScreen from '../screens/auth/reset-password/ResetPasswordScreen';
import StackBackButton from '../components/stack-navigation/StackBackButton';

export type AuthStack = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ResetPassword: { email?: string } | undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStack> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStack, T>,
    RootStackScreenProps<keyof RootStack>
  >;

const Stack = createNativeStackNavigator<AuthStack>();

export type AuthStackNavigator = NavigatorScreenParams<AuthStack>;

export default function AuthStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
        headerLeft: ({ canGoBack }) => (
          <StackBackButton canGoBack={canGoBack} />
        ),
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
  );
}
