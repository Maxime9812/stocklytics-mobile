import { Text } from 'react-native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../components/layouts/BaseLayout';

export default function CreateFolderScreen(
  props: ItemsStackScreenProps<'CreateFolder'>,
) {
  return (
    <BaseLayout>
      <Text className="dark:text-white text-2xl">
        Add folder to Electronics
      </Text>
    </BaseLayout>
  );
}
