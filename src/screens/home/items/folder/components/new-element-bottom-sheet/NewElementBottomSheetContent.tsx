import { Text, TouchableHighlight, View } from 'react-native';
import Card from '../../../../../../components/cards/Card';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from '../../../../../../hooks/use-theme';

export type NewElementBottomSheetContentProps = {
  onPressItem: () => void;
  onPressFolder: () => void;
};

export default function NewElementBottomSheetContent(
  props: NewElementBottomSheetContentProps,
) {
  const { theme } = useTheme();
  return (
    <View className="p-2 space-y-2">
      <Card>
        <TouchableHighlight
          underlayColor={theme == 'dark' ? '#262626' : '#f3f4f6'}
          className="flex-row p-2 justify-between rounded-xl"
          onPress={props.onPressItem}
        >
          <View className="flex-row items-center space-x-2">
            <Feather
              name="file"
              size={24}
              color={theme == 'dark' ? 'white' : 'black'}
            />
            <Text className="dark:text-white">New Item</Text>
          </View>
        </TouchableHighlight>
      </Card>
      <Card>
        <TouchableHighlight
          underlayColor={theme == 'dark' ? '#262626' : '#f3f4f6'}
          className="flex-row p-2 justify-between rounded-xl"
          onPress={props.onPressFolder}
        >
          <View className="flex-row items-center space-x-2">
            <Feather
              name="folder"
              size={24}
              color={theme == 'dark' ? 'white' : 'black'}
            />
            <Text className="dark:text-white">New Folder</Text>
          </View>
        </TouchableHighlight>
      </Card>
    </View>
  );
}
