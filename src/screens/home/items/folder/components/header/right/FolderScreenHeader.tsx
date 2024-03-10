import { View } from 'react-native';
import { styled } from 'nativewind';
import { Feather } from '@expo/vector-icons';
import { Portal } from '@gorhom/portal';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import ThemedBottomSheet from '../../../../../../../components/bottom-sheet/ThemedBottomSheet';
import NewElementBottomSheetContent from './NewElementBottomSheetContent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ItemsStackScreenProps } from '../../../../../../../navigation/ItemsNavigation';
import Button from '../../../../../../../components/buttons/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { createFolderScreenHeaderRightViewModel } from './folder-screen-header-right.viewmodel';

const Icon = styled(Feather, 'text-white text-lg');

export default function FolderScreenHeader({
  route: { params: { id } = {} },
}: ItemsStackScreenProps<'Folder'>) {
  const { t } = useTranslation('home');
  const { t: commonT } = useTranslation('common');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { folderName } = useSelector(
    createFolderScreenHeaderRightViewModel(id),
  );

  const navigation =
    useNavigation<ItemsStackScreenProps<'Folder'>['navigation']>();

  const route = useRoute<ItemsStackScreenProps<'Folder'>['route']>();

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const onPressItem = () => {
    bottomSheetRef.current?.close();
    navigation.push('AddItem', { folderId: route.params?.id });
  };

  const onPressFolder = () => {
    bottomSheetRef.current?.close();
    navigation.push('AddFolder', { parentId: route.params?.id });
  };

  return (
    <View>
      <Button size="sm" onPress={openBottomSheet}>
        <Icon name="plus" />
        <Button.Text className="text-white font-bold">
          {t('items.new')}
        </Button.Text>
      </Button>
      {isBottomSheetOpen && (
        <Portal>
          <ThemedBottomSheet
            enablePanDownToClose
            enableDynamicSizing
            ref={bottomSheetRef}
            onClose={() => setIsBottomSheetOpen(false)}
            withOverlay
          >
            <BottomSheetView>
              <NewElementBottomSheetContent
                folderName={commonT(folderName, { defaultValue: folderName })}
                onAddFolder={onPressFolder}
                onAddItem={onPressItem}
              />
            </BottomSheetView>
          </ThemedBottomSheet>
        </Portal>
      )}
    </View>
  );
}
