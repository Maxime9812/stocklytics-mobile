import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RootStack, RootStackScreenProps } from './NavigationProvider';
import HomeScreen from '../screens/home/HomeScreen';

export type HomeTabParamList = {
  Dashboard: undefined;
  Items: undefined;
  Search: undefined;
  Notifications: undefined;
  Menu: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStack>
  >;

export type HomeTabNavigator = NavigatorScreenParams<HomeTabParamList>;

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Dashboard" component={HomeScreen} />
      <Tab.Screen name="Items" component={HomeScreen} />
      <Tab.Screen name="Search" component={HomeScreen} />
      <Tab.Screen name="Notifications" component={HomeScreen} />
      <Tab.Screen name="Menu" component={HomeScreen} />
    </Tab.Navigator>
  );
}
