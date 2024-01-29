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
import { getFoldersInFolderUseCase } from '../../../../core/folders/hexagon/usecases/get-folders-in-folder/get-folders-in-folder.usecase';

export default function FolderScreen({
  navigation,
  route: { params = {} },
}: ItemsStackScreenProps<'Folder'>) {
  const appDispatch = useAppDispatch();
  const goToItem = (id: string) => {
    navigation.push('Item', { id });
  };

  const goToFolder = (id: string) => {
    navigation.push('Folder', { id });
  };

  const viewModel = useSelector<RootState, FolderScreenViewModelState>(
    (state) => createFolderScreenViewModel(state)({ folderId: params.id }),
  );

  useEffect(() => {
    appDispatch(getItemsInFolderUseCase(params.id));
    appDispatch(getFoldersInFolderUseCase(params.id));
  }, [appDispatch]);

  switch (viewModel.type) {
    case 'loaded':
      return (
        <BaseLayout>
          <FolderListHeader
            foldersCount={viewModel.stats.totalFolders}
            itemsCount={viewModel.stats.totalItems}
            totalQuantity={viewModel.stats.totalQuantity}
          />
          <ScrollView>
            {viewModel.folders.map((folder) => (
              <FolderRow goToFolder={goToFolder} folder={folder} />
            ))}
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
