import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import ThemedBottomSheet from '../../../../components/bottom-sheet/ThemedBottomSheet';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';

export default function ScanNotFound() {
  const { t } = useTranslation('home');
  useEffect(() => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, []);

  return (
    <ThemedBottomSheet
      snapPoints={['25%']}
      enablePanDownToClose
      enableDynamicSizing={false}
    >
      <BottomSheetView>
        <View className="p-4 pt-0">
          <Text className="text-xl font-bold dark:text-white">
            {t('scan.notFound.title')}
          </Text>
          <Text className="text-neutral-400 dark:text-neutral-500">
            {t('scan.notFound.subTitle')}
          </Text>
        </View>
      </BottomSheetView>
    </ThemedBottomSheet>
  );
}
