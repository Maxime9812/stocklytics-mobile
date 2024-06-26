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
import { useTranslation } from 'react-i18next';

export default function FolderScreen({
  navigation,
  route: { params = {} },
}: ItemsStackScreenProps<'Folder'>) {
  const appDispatch = useAppDispatch();
  const viewModel = useSelector<RootState, FolderScreenViewModelState>(
    createFolderScreenViewModel({ folderId: params.id ?? null }),
  );

  useEffect(() => {
    return navigation.addListener('focus', () => {
      appDispatch(getItemsInFolderUseCase(params.id));
      appDispatch(getFoldersInFolderUseCase(params.id));
    });
  }, []);

  switch (viewModel.type) {
    case 'loaded':
      return (
        <LoadedFolderScreen viewModel={viewModel} navigation={navigation} />
      );
    case 'loading':
      return <LoadingFolderScreen />;
    case 'empty':
      return <EmptyFolderScreen />;
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

  const goToMoveItem = (itemId: string) => {
    navigation.push('MoveItem', { itemId });
  };

  const goToMoveFolder = (folderId: string) => {
    navigation.push('MoveFolder', { folderId });
  };

  return (
    <BaseLayout>
      <ScrollView>
        <View className="p-3 pt-1 space-y-3 flex-1">
          <FolderListHeader {...viewModel.stats} />
          <Card className="p-0 overflow-hidden">
            {viewModel.folders.map((folder) => (
              <FolderRow
                key={folder.id}
                onPress={goToFolder}
                folder={folder}
                onDelete={goToDeleteFolder}
                onMove={goToMoveFolder}
              />
            ))}

            {viewModel.items.map((item) => (
              <ItemRow
                key={item.id}
                onPress={goToItem}
                item={item}
                onDelete={goToDeleteItem}
                onMove={goToMoveItem}
              />
            ))}
          </Card>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

const EmptyFolderScreen = () => {
  const { t } = useTranslation('home');
  return (
    <BaseLayout>
      <View className="p-3 pt-1">
        <Card className="h-full">
          <View className="m-auto">
            <Text className="text-center dark:text-white text-lg font-bold">
              {t('items.emptyFolder.title')}
            </Text>
            <Text className="text-center text-neutral-500 dark:text-neutral-400">
              {t('items.emptyFolder.subTitle')}
            </Text>
          </View>
        </Card>
      </View>
    </BaseLayout>
  );
};
