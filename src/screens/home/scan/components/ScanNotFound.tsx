import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import ThemedBottomSheet from '../../../../components/bottom-sheet/ThemedBottomSheet';
import * as Haptics from 'expo-haptics';

export default function ScanNotFound() {
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
            Nothing found
          </Text>
          <Text className="text-neutral-400 dark:text-neutral-500">
            You can link a barcode to an item from your inventory
          </Text>
        </View>
      </BottomSheetView>
    </ThemedBottomSheet>
  );
}
