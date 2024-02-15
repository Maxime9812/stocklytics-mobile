import * as Haptics from 'expo-haptics';
import { HomeTabScreenProps } from '../../../../../navigation/HomeNavigation';
import React, { useEffect, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import ThemedBottomSheet from '../../../../../components/bottom-sheet/ThemedBottomSheet';
import { Text, View } from 'react-native';
import Button from '../../../../../components/buttons/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../../store-hooks';
import { createScanItemFoundViewModel } from './scan-item-found.viewmodel';
import { getItemByIdUseCase } from '../../../../../core/items/hexagon/usecases/get-item-by-id/get-item-by-id.usecase';
import { Feather } from '@expo/vector-icons';

type ItemFoundViewProps = {
  id: string;
  navigation: HomeTabScreenProps<'Scan'>['navigation'];
};

export default function ScanItemFound({ id, navigation }: ItemFoundViewProps) {
  const bottomSheet = useRef<BottomSheet>();
  const dispatch = useAppDispatch();
  const viewModel = useSelector(createScanItemFoundViewModel({ id }));

  useEffect(() => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    dispatch(getItemByIdUseCase(id));
  }, []);

  const goToItem = () => {
    bottomSheet.current?.close();
    navigation.navigate('Home', {
      screen: 'Items',
      params: { screen: 'Item', params: { id } },
    });
  };

  return (
    <ThemedBottomSheet
      ref={bottomSheet}
      snapPoints={['30%', '30%']}
      enablePanDownToClose
    >
      {viewModel.type === 'loading' && <View />}
      {viewModel.type === 'loaded' && (
        <BottomSheetView>
          <View className="p-4 h-full justify-between">
            <View className="space-y-2">
              <Text className="text-xl font-bold dark:text-white">
                {viewModel.item.name}
              </Text>
              <View className="justify-between flex-row items-center">
                <View className="rounded-xl bg-neutral-300 dark:bg-neutral-700 w-24 h-24 justify-center items-center">
                  <Text className="text-neutral-50">
                    <Feather name="file" size={40} />
                  </Text>
                </View>
                <Text className="text-lg dark:text-white">
                  {viewModel.item.quantity} unit
                </Text>
              </View>
            </View>
            <Button onPress={goToItem}>
              <Button.Text>Detail</Button.Text>
            </Button>
          </View>
        </BottomSheetView>
      )}
    </ThemedBottomSheet>
  );
}
