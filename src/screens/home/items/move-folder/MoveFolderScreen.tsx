import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../store-hooks';
import { createMoveFolderScreenViewModel } from './move-folder-screen.viewmodel';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import { useState } from 'react';
import { isRejected } from '@reduxjs/toolkit';
import BaseLayout from '../../../../components/layouts/BaseLayout';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import FolderSelectionInput from '../../../../components/inputs/folder-selection-input/FolderSelectionInput';
import Button from '../../../../components/buttons/Button';

export default function MoveFolderScreen({
  navigation,
  route: {
    params: { folderId },
  },
}: ItemsStackScreenProps<'MoveFolder'>) {
  const { t } = useTranslation('home');
  const dispatch = useAppDispatch();
  const [selectedFolderId, setSelectedFolderId] = useState<
    string | undefined
  >();
  const { canSubmit, moveFolder, folderName } = useSelector(
    createMoveFolderScreenViewModel({ dispatch, folderId, selectedFolderId }),
  );

  const onSubmit = async () => {
    const action = await moveFolder();
    if (isRejected(action)) {
      return;
    }
    navigation.goBack();
  };

  return (
    <BaseLayout variant="secondary">
      <View className="p-4 pt-0 justify-between space-y-2 flex-1">
        <View className="space-y-4 flex-1">
          <View className="space-y-2">
            <Text className="text-2xl dark:text-white font-bold">
              {t('move.folder.title')}
            </Text>
            <Text className="text-neutral-500 dark:text-neutral-400">
              {t('move.item.subTitle.start')}
              <Text className="text-black dark:text-white">{folderName}</Text>
              {t('move.folder.subTitle.end')}
            </Text>
          </View>
          <View className="flex-1">
            <FolderSelectionInput
              onChange={setSelectedFolderId}
              value={selectedFolderId}
              hideFolderId={folderId}
            />
          </View>
        </View>

        <Button disabled={!canSubmit} onPress={onSubmit}>
          <Button.Text>{t('move.folder.submit')}</Button.Text>
        </Button>
      </View>
    </BaseLayout>
  );
}
