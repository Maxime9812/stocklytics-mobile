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
import StackBackButton from '../components/stack-navigation/StackBackButton';
import FolderScreenHeader from '../screens/home/items/folder/FolderScreenHeader';
import CreateItemScreen from '../screens/home/items/create-item/CreateItemScreen';
import CreateFolderScreen from '../screens/home/items/create-folder/CreateFolderScreen';

export type ItemsStack = {
  Folder: { id?: string } | undefined;
  Item: { id: string };
  CreateItem: { folderId?: string };
  CreateFolder: { folderId?: string };
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
        headerLeft: ({ canGoBack }) => (
          <StackBackButton canGoBack={canGoBack} />
        ),
      }}
    >
      <Stack.Screen
        name="Folder"
        component={FolderScreen}
        options={{
          headerRight: () => <FolderScreenHeader />,
        }}
      />
      <Stack.Screen name="Item" component={ItemScreen} />
      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          headerLeft: ({ canGoBack }) => (
            <StackBackButton canGoBack={canGoBack} variant={'close'} />
          ),
        }}
      >
        <Stack.Screen name="CreateItem" component={CreateItemScreen} />
        <Stack.Screen name="CreateFolder" component={CreateFolderScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
