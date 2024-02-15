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
    <ThemedBottomSheet snapPoints={['30%', '30%']} enablePanDownToClose>
      <BottomSheetView>
        <View className="p-3">
          <Text className="dark:text-white">Nothing found</Text>
        </View>
      </BottomSheetView>
    </ThemedBottomSheet>
  );
}
