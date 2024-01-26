import { Text, TouchableOpacity } from 'react-native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../components/layouts/BaseLayout';

export default function FolderScreen({
  navigation,
}: ItemsStackScreenProps<'Folder'>) {
  return (
    <BaseLayout>
      <TouchableOpacity onPress={() => navigation.push('Item')}>
        <Text>Item</Text>
      </TouchableOpacity>
      <Text>Folder</Text>
    </BaseLayout>
  );
}
