import { ScrollView, Text } from 'react-native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../components/layouts/BaseLayout';
import ItemRow from './components/ItemRow';
import FolderListHeader from './components/FolderListHeader';
import FolderRow from './components/FolderRow';
import { useSelector } from 'react-redux';
import {
  createFolderScreenViewModel,
  FolderScreenViewModelState,
} from './folder-screen.viewmodel';
import { RootState } from '../../../../core/create-store';
import { exhaustiveGuard } from '../../../../core/common/utils/exhaustive-guard';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../../store-hooks';
import { getItemsInFolderUseCase } from '../../../../core/items/hexagon/usecases/get-items-in-folder/get-items-in-folder.usecase';

export default function FolderScreen({
  navigation,
}: ItemsStackScreenProps<'Folder'>) {
  const appDispatch = useAppDispatch();
  const goToItem = (id: string) => {
    navigation.push('Item', { id });
  };

  const goToFolder = (id: string) => {
    navigation.push('Folder', { id });
  };

  const viewModel = useSelector<RootState, FolderScreenViewModelState>(
    (state) => createFolderScreenViewModel(state)({ folderId: undefined }),
  );

  useEffect(() => {
    appDispatch(getItemsInFolderUseCase(undefined));
  }, [appDispatch]);

  switch (viewModel.type) {
    case 'loaded':
      return (
        <BaseLayout>
          <FolderListHeader
            foldersCount={2}
            itemsCount={viewModel.stats.totalItems}
            totalQuantity={viewModel.stats.totalQuantity}
          />
          <ScrollView>
            <FolderRow
              goToFolder={goToFolder}
              folder={{ id: '1', name: 'Electronics', quantity: 1 }}
            />
            {viewModel.items.map((item) => (
              <ItemRow goToItem={goToItem} item={item} />
            ))}
          </ScrollView>
        </BaseLayout>
      );
    case 'loading':
      return (
        <BaseLayout>
          <Text>Loading</Text>
        </BaseLayout>
      );
    default:
      exhaustiveGuard(viewModel);
  }
}
