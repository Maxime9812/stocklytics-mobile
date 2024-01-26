import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RootStack, RootStackScreenProps } from './NavigationProvider';
import ItemScreen from '../screens/home/items/item/ItemScreen';
import FolderScreen from '../screens/home/items/folder/FolderScreen';

export type ItemsStack = {
  Folder: undefined;
  Item: undefined;
};

export type ItemsStackScreenProps<T extends keyof ItemsStack> =
  CompositeScreenProps<
    NativeStackScreenProps<ItemsStack, T>,
    RootStackScreenProps<keyof RootStack>
  >;

const Stack = createNativeStackNavigator<ItemsStack>();

export type ItemsNavigator = NavigatorScreenParams<ItemsStack>;

export default function ItemsNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Folder"
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Folder"
        component={FolderScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Item" component={ItemScreen} />
    </Stack.Navigator>
  );
}
