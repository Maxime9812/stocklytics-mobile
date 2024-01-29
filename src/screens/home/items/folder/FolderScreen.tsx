import { ScrollView } from 'react-native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../components/layouts/BaseLayout';
import ItemRow from './components/ItemRow';
import FolderListHeader from './components/FolderListHeader';
import FolderRow from './components/FolderRow';

export default function FolderScreen({
  navigation,
}: ItemsStackScreenProps<'Folder'>) {
  const goToItem = () => {
    navigation.navigate('Item');
  };

  return (
    <BaseLayout>
      <FolderListHeader foldersCount={2} itemsCount={2} totalQuantity={102} />
      <ScrollView>
        <FolderRow
          goToFolder={() => {}}
          folder={{ id: '1', name: 'Electronics', quantity: 1 }}
        />
        <ItemRow
          goToItem={goToItem}
          item={{ id: '1', name: 'Iphone 13 pro max', quantity: 1 }}
        />
      </ScrollView>
    </BaseLayout>
  );
}
