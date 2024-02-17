import { ScrollView, Text, View } from 'react-native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../components/layouts/BaseLayout';
import ItemRow from './components/ItemRow';
import FolderListHeader from './components/FolderListHeader';
import FolderRow from './components/FolderRow';
import { useSelector } from 'react-redux';
import {
  createFolderScreenViewModel,
  FolderScreenViewModelState,
  FolderScreenViewModelStateLoaded,
} from './folder-screen.viewmodel';
import { RootState } from '../../../../core/create-store';
import { exhaustiveGuard } from '../../../../core/common/utils/exhaustive-guard';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../../store-hooks';
import { getItemsInFolderUseCase } from '../../../../core/items/hexagon/usecases/get-items-in-folder/get-items-in-folder.usecase';
import { getFoldersInFolderUseCase } from '../../../../core/folders/hexagon/usecases/get-folders-in-folder/get-folders-in-folder.usecase';
import Card from '../../../../components/cards/Card';

export default function FolderScreen({
  navigation,
  route: { params = {} },
}: ItemsStackScreenProps<'Folder'>) {
  const appDispatch = useAppDispatch();
  const viewModel = useSelector<RootState, FolderScreenViewModelState>(
    createFolderScreenViewModel({ folderId: params.id ?? null }),
  );

  useEffect(() => {
    appDispatch(getItemsInFolderUseCase(params.id));
    appDispatch(getFoldersInFolderUseCase(params.id));
  }, [appDispatch]);

  switch (viewModel.type) {
    case 'loaded':
      return (
        <LoadedFolderScreen viewModel={viewModel} navigation={navigation} />
      );
    case 'loading':
      return <LoadingFolderScreen />;
    default:
      exhaustiveGuard(viewModel);
  }
}

const LoadingFolderScreen = () => (
  <BaseLayout>
    <Text>Loading</Text>
  </BaseLayout>
);

type LoadedFolderScreenProps = {
  viewModel: FolderScreenViewModelStateLoaded;
  navigation: ItemsStackScreenProps<'Folder'>['navigation'];
};

const LoadedFolderScreen = ({
  viewModel,
  navigation,
}: LoadedFolderScreenProps) => {
  const goToItem = (id: string) => {
    navigation.push('ItemDetails', { id });
  };

  const goToFolder = (id: string) => {
    navigation.push('Folder', { id });
  };

  const goToDeleteItem = (id: string) => {
    navigation.push('DeleteItem', { id });
  };

  const goToDeleteFolder = (id: string) => {
    navigation.push('DeleteFolder', { id });
  };

  return (
    <BaseLayout>
      <ScrollView>
        <View className="p-3 pt-0 space-y-3 flex-1">
          <FolderListHeader {...viewModel.stats} />
          <Card className="p-1">
            {viewModel.folders.map((folder) => (
              <FolderRow
                key={folder.id}
                onPress={goToFolder}
                folder={folder}
                onDelete={goToDeleteFolder}
              />
            ))}

            {viewModel.items.map((item) => (
              <ItemRow
                key={item.id}
                onPress={goToItem}
                item={item}
                onDelete={goToDeleteItem}
              />
            ))}
          </Card>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};
