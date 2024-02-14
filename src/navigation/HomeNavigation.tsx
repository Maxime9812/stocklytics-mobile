import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RootStack, RootStackScreenProps } from './NavigationProvider';
import ScanScreen from '../screens/home/scan/ScanScreen';
import MenuScreen from '../screens/home/menu/MenuScreen';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import ItemsNavigation, { ItemsNavigator } from './ItemsNavigation';
import { useTheme } from '../hooks/use-theme';

export type HomeTab = {
  Dashboard: undefined;
  Items: ItemsNavigator;
  Scan: undefined;
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

const ItemsIcon = (props: IconProps) => {
  return <Feather name="archive" {...props} />;
};

const ScanIcon = (props: IconProps) => {
  return <MaterialCommunityIcons name="barcode-scan" {...props} />;
};

const MenuIcon = (props: IconProps) => {
  return <Feather name="menu" {...props} />;
};

export default function HomeNavigation() {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6273f2',
        tabBarInactiveTintColor: '#a3a3a3',
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: theme == 'dark' ? '#171717' : '#ffffff',
        },
      }}
    >
      <Tab.Screen
        name="Items"
        component={ItemsNavigation}
        options={{ tabBarIcon: ItemsIcon }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{ tabBarIcon: ScanIcon }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{ tabBarIcon: MenuIcon }}
      />
    </Tab.Navigator>
  );
}
