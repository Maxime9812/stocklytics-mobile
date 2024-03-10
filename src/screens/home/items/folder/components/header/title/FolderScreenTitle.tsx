import { Text, View } from 'react-native';
import { ItemsStackScreenProps } from '../../../../../../../navigation/ItemsNavigation';
import { useSelector } from 'react-redux';
import { createFolderScreenHeaderTitleViewModel } from './folder-screen-header-title.viewmodel';

export default function FolderScreenTitle({
  route,
}: ItemsStackScreenProps<'Folder'>) {
  const { isRoot, name } = useSelector(
    createFolderScreenHeaderTitleViewModel({ folderId: route.params?.id }),
  );

  if (isRoot) {
    return <View></View>;
  }
  return <Text className="dark:text-white">{name}</Text>;
}
