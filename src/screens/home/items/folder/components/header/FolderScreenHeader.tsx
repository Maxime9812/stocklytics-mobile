import { View } from 'react-native';
import { styled } from 'nativewind';
import { Feather } from '@expo/vector-icons';
import { Portal } from '@gorhom/portal';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import ThemedBottomSheet from '../../../../../../components/bottom-sheet/ThemedBottomSheet';
import NewElementBottomSheetContent from './NewElementBottomSheetContent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ItemsStackScreenProps } from '../../../../../../navigation/ItemsNavigation';
import Button from '../../../../../../components/buttons/Button';

const Icon = styled(Feather, 'text-white text-lg');

export default function FolderScreenHeader(props: View['props']) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

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
    <View {...props}>
      <Button size="sm" onPress={openBottomSheet}>
        <Icon name="plus" />
        <Button.Text className="text-white font-bold">New</Button.Text>
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
                folderName="Folder"
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
