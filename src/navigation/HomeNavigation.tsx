import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RootStack, RootStackScreenProps } from './NavigationProvider';
import DashboardScreen from '../screens/home/dashboard/DashboardScreen';
import ItemsScreen from '../screens/home/items/ItemsScreen';
import SearchScreen from '../screens/home/Search/SearchScreen';
import NotificationScreen from '../screens/home/notification/NotificationScreen';
import MenuScreen from '../screens/home/menu/MenuScreen';

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
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Items" component={ItemsScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
}
