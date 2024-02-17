import BaseLayout from '../../../../../components/layouts/BaseLayout';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { createDeleteItemScreenViewModel } from './delete-item-screen.viewmodel';
import { isRejected } from '@reduxjs/toolkit';
import { ItemsStackScreenProps } from '../../../../../navigation/ItemsNavigation';
import { useAppDispatch } from '../../../../../store-hooks';
import Button from '../../../../../components/buttons/Button';

export default function DeleteItemScreen({
  navigation,
  route: {
    params: { id },
  },
}: ItemsStackScreenProps<'DeleteItem'>) {
  const dispatch = useAppDispatch();

  const { deleteItem, item } = useSelector(
    createDeleteItemScreenViewModel({ itemId: id, dispatch }),
  );

  const handleDelete = async () => {
    const action = await deleteItem();

    if (isRejected(action)) return;

    navigation.goBack();
  };

  return (
    <BaseLayout variant="secondary">
      <View className="p-4 justify-between space-y-2 flex-1">
        <View className="space-y-4">
          <View className="space-y-2">
            <Text className="text-2xl dark:text-white font-bold">Delete</Text>
            <Text className="text-neutral-500 dark:text-neutral-400">
              Are you sure you want to delete item{' '}
              <Text className="dark:text-white font-bold">{item.name}</Text> ?
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
