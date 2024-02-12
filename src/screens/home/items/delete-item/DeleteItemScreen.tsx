import BaseLayout from '../../../../components/layouts/BaseLayout';
import { Text, View } from 'react-native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import Button from '../../../../components/buttons/Button';
import { useSelector } from 'react-redux';
import { createDeleteItemScreenViewModel } from './delete-item-screen.viewmodel';
import { useAppDispatch } from '../../../../store-hooks';

export default function DeleteItemScreen({
  route: {
    params: { id },
  },
}: ItemsStackScreenProps<'DeleteItem'>) {
  const dispatch = useAppDispatch();

  const { deleteItem, item } = useSelector(
    createDeleteItemScreenViewModel({ itemId: id, dispatch }),
  );

  return (
    <BaseLayout variant="secondary">
      <View className="p-4 justify-between space-y-2 flex-1">
        <View className="space-y-4">
          <View className="space-y-2">
            <Text className="text-2xl dark:text-white font-bold">Delete</Text>
            <View className="space-x-1 flex-row items-center">
              <Text className="text-neutral-500 dark:text-neutral-400">
                Are you sure you want to delete
              </Text>
              <Text className="dark:text-white font-bold">{item.name}</Text>
              <Text className="text-neutral-500 dark:text-neutral-400">?</Text>
            </View>
          </View>
        </View>
        <Button type="destructive" onPress={deleteItem}>
          <Button.Text>Delete</Button.Text>
        </Button>
      </View>
    </BaseLayout>
  );
}
