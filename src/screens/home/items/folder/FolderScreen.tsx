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
    navigation.push('Item', { id });
  };

  const goToFolder = (id: string) => {
    navigation.push('Folder', { id });
  };

  return (
    <BaseLayout className="flex-1">
      <ScrollView className="">
        <View className="p-4 space-y-2 flex-1">
          <FolderListHeader {...viewModel.stats} />

          <Card>
            {viewModel.folders.map((folder) => (
              <FolderRow
                key={folder.id}
                goToFolder={goToFolder}
                folder={folder}
              />
            ))}
            {viewModel.items.map((item) => (
              <ItemRow key={item.id} goToItem={goToItem} item={item} />
            ))}
          </Card>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};
