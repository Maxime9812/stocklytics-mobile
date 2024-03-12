import BaseLayout from '../../../../../components/layouts/BaseLayout';
import { ItemsStackScreenProps } from '../../../../../navigation/ItemsNavigation';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { createMoveItemScreenViewModel } from './move-item-screen.viewmodel';
import Button from '../../../../../components/buttons/Button';
import { useState } from 'react';
import FolderSelectionInput from '../../../../../components/inputs/folder-selection-input/FolderSelectionInput';
import { useAppDispatch } from '../../../../../store-hooks';
import { isRejected } from '@reduxjs/toolkit';

export default function MoveItemScreen({
  navigation,
  route: {
    params: { itemId },
  },
}: ItemsStackScreenProps<'MoveItem'>) {
  const { t } = useTranslation('home');
  const dispatch = useAppDispatch();
  const [selectedFolderId, setSelectedFolderId] = useState<
    string | undefined
  >();

  const { itemName, canSubmit, moveItem } = useSelector(
    createMoveItemScreenViewModel({ itemId, selectedFolderId, dispatch }),
  );

  const onSubmit = async () => {
    const action = await moveItem();

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
              {t('move.item.title')}
            </Text>
            <Text className="text-neutral-500 dark:text-neutral-400">
              {t('move.item.subTitle.start')}
              <Text className="text-black dark:text-white">{itemName}</Text>
              {t('move.item.subTitle.end')}
            </Text>
          </View>
          <View className="flex-1">
            <FolderSelectionInput
              onChange={setSelectedFolderId}
              value={selectedFolderId}
            />
          </View>
        </View>

        <Button disabled={!canSubmit} onPress={onSubmit}>
          <Button.Text>{t('move.item.submit')}</Button.Text>
        </Button>
      </View>
    </BaseLayout>
  );
}
