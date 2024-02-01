import { TouchableOpacity, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { Feather } from '@expo/vector-icons';
import { Portal } from '@gorhom/portal';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';

const Icon = styled(Feather, 'text-white text-lg');

export default function FolderScreenHeader() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  return (
    <View>
      <TouchableOpacity
        className="px-2 rounded-full bg-red-400 flex-row items-center"
        onPress={openBottomSheet}
      >
        <Icon name="plus" />
        <Text className="text-white font-bold">New</Text>
      </TouchableOpacity>
      {isBottomSheetOpen && (
        <Portal>
          <BottomSheet
            snapPoints={snapPoints}
            enablePanDownToClose
            ref={bottomSheetRef}
            onClose={() => setIsBottomSheetOpen(false)}
          >
            <Text>Hello</Text>
          </BottomSheet>
        </Portal>
      )}
    </View>
  );
}
