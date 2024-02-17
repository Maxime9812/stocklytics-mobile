import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../components/layouts/BaseLayout';
import { Text, View } from 'react-native';
import Button from '../../../../components/buttons/Button';
import { useAppDispatch } from '../../../../store-hooks';
import { useSelector } from 'react-redux';
import { createDeleteFolderScreenViewModel } from './delete-folder-screen.viewmodel';
import { isRejected } from '@reduxjs/toolkit';

export default function DeleteFolderScreen({
  navigation,
  route: {
    params: { id },
  },
}: ItemsStackScreenProps<'DeleteFolder'>) {
  const dispatch = useAppDispatch();
  const { folder, deleteFolder } = useSelector(
    createDeleteFolderScreenViewModel({ folderId: id, dispatch }),
  );
  const handleDelete = async () => {
    const action = await deleteFolder();

    if (isRejected(action)) return;

    navigation.goBack();
  };
  return (
    <BaseLayout variant="secondary">
      <View className="p-4 pt-0 justify-between space-y-2 flex-1">
        <View className="space-y-4">
          <View className="space-y-2">
            <Text className="text-2xl dark:text-white font-bold">Delete</Text>
            <Text className="text-neutral-500 dark:text-neutral-400">
              Are you sure you want to delete{' '}
              <Text className="font-bold dark:text-white">{folder.name}</Text>{' '}
              and all elements is this folder ?
            </Text>
          </View>
        </View>
        <Button type="destructive" onPress={handleDelete}>
          <Button.Text>Delete</Button.Text>
        </Button>
      </View>
    </BaseLayout>
  );
}
