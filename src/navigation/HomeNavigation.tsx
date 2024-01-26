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
import SearchScreen from '../screens/home/Search/SearchScreen';
import NotificationScreen from '../screens/home/notification/NotificationScreen';
import MenuScreen from '../screens/home/menu/MenuScreen';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import ItemsNavigation, { ItemsNavigator } from './ItemsNavigation';

export type HomeTab = {
  Dashboard: undefined;
  Items: ItemsNavigator;
  Search: undefined;
  Notifications: undefined;
  Menu: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTab> = CompositeScreenProps<
  BottomTabScreenProps<HomeTab, T>,
  RootStackScreenProps<keyof RootStack>
>;

export type HomeTabNavigator = NavigatorScreenParams<HomeTab>;

const Tab = createBottomTabNavigator<HomeTab>();

type IconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const DashboardIcon = (props: IconProps) => {
  return <MaterialCommunityIcons name="view-dashboard-outline" {...props} />;
};

const ItemsIcon = (props: IconProps) => {
  return <Feather name="archive" {...props} />;
};

const SearchIcon = (props: IconProps) => {
  return <Feather name="search" {...props} />;
};

const NotificationIcon = (props: IconProps) => {
  return <Ionicons name="notifications-outline" {...props} />;
};

const MenuIcon = (props: IconProps) => {
  return <Feather name="menu" {...props} />;
};

export default function HomeNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f87171',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: DashboardIcon,
          tabBarBadgeStyle: {
            backgroundColor: '#f87171',
          },
        }}
      />
      <Tab.Screen
        name="Items"
        component={ItemsNavigation}
        options={{ tabBarIcon: ItemsIcon }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarIcon: SearchIcon }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ tabBarIcon: NotificationIcon }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{ tabBarIcon: MenuIcon }}
      />
    </Tab.Navigator>
  );
}
