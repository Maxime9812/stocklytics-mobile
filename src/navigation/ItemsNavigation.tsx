import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RootStack, RootStackScreenProps } from './NavigationProvider';
import FolderScreen from '../screens/home/items/folder/FolderScreen';
import StackBackButton from '../components/stack-navigation/StackBackButton';
import FolderScreenHeader from '../screens/home/items/folder/components/header/right/FolderScreenHeader';
import AddFolderScreen from '../screens/home/items/add-folder/AddFolderScreen';
import DeleteFolderScreen from '../screens/home/items/delete-folder/DeleteFolderScreen';
import LinkBarcodeScreen from '../screens/home/items/item/link-barcode/LinkBarcodeScreen';
import ItemDetailScreen from '../screens/home/items/item/item-detail/ItemDetailScreen';
import DeleteItemScreen from '../screens/home/items/item/delete-item/DeleteItemScreen';
import EditItemNoteScreen from '../screens/home/items/item/edit-item-note/EditItemNoteScreen';
import EditItemTagsScreen from '../screens/home/items/item/edit-item-tags/EditItemTagsScreen';
import EditItemNameScreen from '../screens/home/items/item/edit-item-name/EditItemNameScreen';
import AddItemScreen from '../screens/home/items/item/add-item/AddItemScreen';
import EditQuantityScreen from '../screens/home/items/item/edit-quantity/EditQuantityScreen';
import FolderScreenTitle from '../screens/home/items/folder/components/header/title/FolderScreenTitle';
import MoveItemScreen from '../screens/home/items/item/move-item/MoveItemScreen';
import MoveFolderScreen from '../screens/home/items/move-folder/MoveFolderScreen';

export type ItemsStack = {
  Folder: { id?: string } | undefined;
  ItemDetails: { id: string };
  AddItem: { folderId?: string };
  DeleteItem: { id: string };
  AddFolder: { parentId?: string };
  EditItemNote: { itemId: string; note: string };
  LinkBarcode: { itemId: string };
  EditItemTags: { itemId: string };
  DeleteFolder: { id: string };
  EditItemName: { itemId: string };
  EditItemQuantity: { itemId: string };
  MoveItem: { itemId: string };
  MoveFolder: { folderId: string };
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
        options={({ route, navigation }) => ({
          headerTitle: () => (
            <FolderScreenTitle route={route} navigation={navigation} />
          ),
          headerRight: () => (
            <FolderScreenHeader route={route} navigation={navigation} />
          ),
        })}
      />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerLeft: ({ canGoBack }) => (
            <StackBackButton canGoBack={canGoBack} variant={'close'} />
          ),
        }}
      >
        <Stack.Screen
          name="ItemDetails"
          component={ItemDetailScreen}
          options={{ presentation: 'transparentModal' }}
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

        <Stack.Screen name="AddFolder" component={AddFolderScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} />

        <Stack.Group>
          <Stack.Screen name="DeleteItem" component={DeleteItemScreen} />
          <Stack.Screen name="MoveItem" component={MoveItemScreen} />
          <Stack.Screen name="DeleteFolder" component={DeleteFolderScreen} />
          <Stack.Screen name="MoveFolder" component={MoveFolderScreen} />
          <Stack.Screen name="EditItemNote" component={EditItemNoteScreen} />
          <Stack.Screen name="EditItemTags" component={EditItemTagsScreen} />
          <Stack.Screen name="EditItemName" component={EditItemNameScreen} />
          <Stack.Screen
            name="EditItemQuantity"
            component={EditQuantityScreen}
          />
        </Stack.Group>
      </Stack.Group>
    </Stack.Navigator>
  );
}
