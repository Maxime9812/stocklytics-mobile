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
import FolderScreenHeader from '../screens/home/items/folder/components/header/FolderScreenHeader';
import AddItemScreen from '../screens/home/items/add-item/AddItemScreen';
import AddFolderScreen from '../screens/home/items/add-folder/AddFolderScreen';
import DeleteItemScreen from '../screens/home/items/delete-item/DeleteItemScreen';
import EditItemNoteScreen from '../screens/home/items/edit-item-note/EditItemNoteScreen';
import LinkBarcodeScreen from '../screens/home/items/link-barcode/LinkBarcodeScreen';
import EditItemTagsScreen from '../screens/home/items/edit-item-tags/EditItemTagsScreen';
import DeleteFolderScreen from '../screens/home/items/delete-folder/DeleteFolderScreen';

export type ItemsStack = {
  Folder: { id?: string } | undefined;
  Item: { id: string };
  AddItem: { folderId?: string };
  DeleteItem: { id: string };
  AddFolder: { parentId?: string };
  EditItemNote: { itemId: string; note: string };
  LinkBarcode: { itemId: string };
  EditItemTags: { itemId: string };
  DeleteFolder: { id: string };
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
      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          headerLeft: ({ canGoBack }) => (
            <StackBackButton canGoBack={canGoBack} variant={'close'} />
          ),
        }}
      >
        <Stack.Screen
          name="Item"
          component={ItemScreen}
          options={{ presentation: 'transparentModal' }}
        />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
        <Stack.Screen name="AddFolder" component={AddFolderScreen} />
        <Stack.Screen
          name="DeleteItem"
          component={DeleteItemScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="DeleteFolder"
          component={DeleteFolderScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="EditItemNote"
          component={EditItemNoteScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="EditItemTags"
          component={EditItemTagsScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="LinkBarcode"
          component={LinkBarcodeScreen}
          options={{
            presentation: 'transparentModal',
            headerLeft: ({ canGoBack }) => (
              <StackBackButton
                canGoBack={canGoBack}
                variant={'close'}
                className="p-4 rounded-full bg-neutral-300 dark:bg-neutral-800 opacity-70"
              />
            ),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
