import {
  TouchableOpacity,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { styled } from 'nativewind';
import { Feather } from '@expo/vector-icons';
import { Portal } from '@gorhom/portal';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef, useState } from 'react';
import ThemedBottomSheet from '../../../../components/bottom-sheet/ThemedBottomSheet';
import { FullWindowOverlay } from 'react-native-screens';
import NewElementBottomSheetContent from './components/new-element-bottom-sheet/NewElementBottomSheetContent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';

const Icon = styled(Feather, 'text-white text-lg');

export default function FolderScreenHeader(props: View['props']) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoints = useMemo(() => ['25%', '25%'], []);

  const navigation =
    useNavigation<ItemsStackScreenProps<'Folder'>['navigation']>();

  const route = useRoute<ItemsStackScreenProps<'Folder'>['route']>();

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const onPressItem = () => {
    bottomSheetRef.current?.close();
    navigation.push('CreateItem', { folderId: route.params?.id });
  };

  const onPressFolder = () => {
    bottomSheetRef.current?.close();
    navigation.push('CreateFolder', { folderId: route.params?.id });
  };

  return (
    <View {...props}>
      <TouchableOpacity
        className="px-2 rounded-full bg-red-400 flex-row items-center"
        onPress={openBottomSheet}
      >
        <Icon name="plus" />
        <Text className="text-white font-bold">New</Text>
      </TouchableOpacity>
      {isBottomSheetOpen && (
        <Portal>
          <FullWindowOverlay>
            <TouchableWithoutFeedback
              onPress={() => bottomSheetRef.current?.close()}
            >
              <View className="flex-1 bg-black opacity-40"></View>
            </TouchableWithoutFeedback>
            <ThemedBottomSheet
              snapPoints={snapPoints}
              enablePanDownToClose
              ref={bottomSheetRef}
              onClose={() => setIsBottomSheetOpen(false)}
            >
              <BottomSheetView>
                <NewElementBottomSheetContent
                  onPressFolder={onPressFolder}
                  onPressItem={onPressItem}
                />
              </BottomSheetView>
            </ThemedBottomSheet>
          </FullWindowOverlay>
        </Portal>
      )}
    </View>
  );
}
