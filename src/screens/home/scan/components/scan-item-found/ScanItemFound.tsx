import * as Haptics from 'expo-haptics';
import { HomeTabScreenProps } from '../../../../../navigation/HomeNavigation';
import React, { useEffect, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import ThemedBottomSheet from '../../../../../components/bottom-sheet/ThemedBottomSheet';
import { Image, Text, View } from 'react-native';
import Button from '../../../../../components/buttons/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../../store-hooks';
import { createScanItemFoundViewModel } from './scan-item-found.viewmodel';
import { getItemByIdUseCase } from '../../../../../core/items/hexagon/usecases/get-item-by-id/get-item-by-id.usecase';
import { Feather } from '@expo/vector-icons';
import Card from '../../../../../components/cards/Card';
import { useTranslation } from 'react-i18next';

type ItemFoundViewProps = {
  id: string;
  navigation: HomeTabScreenProps<'Scan'>['navigation'];
};

export default function ScanItemFound({ id, navigation }: ItemFoundViewProps) {
  const { t } = useTranslation('home');
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
      params: { screen: 'ItemDetails', params: { id } },
    });
  };

  return (
    <ThemedBottomSheet
      ref={bottomSheet}
      enableDynamicSizing
      enablePanDownToClose
    >
      {viewModel.type === 'loading' && <View />}
      {viewModel.type === 'loaded' && (
        <BottomSheetView>
          <View className="p-4 pt-0 space-y-4 mb-4">
            <View className="space-y-2">
              <Text className="text-xl font-bold dark:text-white">
                {viewModel.item.name}
              </Text>
              <View className="justify-between flex-row items-center">
                <View className="rounded-xl bg-neutral-300 dark:bg-neutral-700 w-24 h-24 justify-center items-center overflow-hidden">
                  {viewModel.item.imageUrl && (
                    <Image
                      source={{ uri: viewModel.item.imageUrl }}
                      className="w-full h-full"
                    ></Image>
                  )}
                  {!viewModel.item.imageUrl && (
                    <Text className="text-neutral-50">
                      <Feather name="file" size={40} />
                    </Text>
                  )}
                </View>
                <Text className="text-lg dark:text-white">
                  {t('scan.item.unit', { count: viewModel.item.quantity })}
                </Text>
              </View>
            </View>
            <Card className="p-1" type="secondary">
              <Button
                variant="ghost"
                type="secondary"
                className="p-3"
                onPress={goToItem}
              >
                <Button.Icon className="text-royal-blue-500">
                  <Feather name="eye" size={18} />
                </Button.Icon>
                <Button.Text className="text-royal-blue-500">
                  {t('scan.item.details')}
                </Button.Text>
              </Button>
            </Card>
          </View>
        </BottomSheetView>
      )}
    </ThemedBottomSheet>
  );
}
