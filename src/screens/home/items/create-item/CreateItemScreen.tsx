import { Text } from 'react-native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../components/layouts/BaseLayout';

export default function CreateItemScreen(
  props: ItemsStackScreenProps<'CreateItem'>,
) {
  return (
    <BaseLayout>
      <Text>For folder {props.route.params.folderId}</Text>
    </BaseLayout>
  );
}
