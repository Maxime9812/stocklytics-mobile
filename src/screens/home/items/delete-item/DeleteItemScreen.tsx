import BaseLayout from '../../../../components/layouts/BaseLayout';
import { Text } from 'react-native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';

export default function DeleteItemScreen({
  route: {
    params: { id },
  },
}: ItemsStackScreenProps<'DeleteItem'>) {
  return (
    <BaseLayout>
      <Text className="dark:text-white">Delete Item {id}</Text>
    </BaseLayout>
  );
}
