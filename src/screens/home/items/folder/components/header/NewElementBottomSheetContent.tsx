import { Text, TouchableHighlight, View } from 'react-native';
import Card from '../../../../../../components/cards/Card';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from '../../../../../../hooks/use-theme';

export type NewElementBottomSheetContentProps = {
  onAddItem: () => void;
  onAddFolder: () => void;
  folderName: string;
};

export default function NewElementBottomSheetContent({
  onAddFolder,
  onAddItem,
  folderName,
}: NewElementBottomSheetContentProps) {
  return (
    <View className="p-2 space-y-4">
      <Text className="dark:text-white">Adding to : {folderName}</Text>
      <View className="space-y-2">
        <ActionButton onPress={onAddItem} icon="file" text="Add file" />
        <ActionButton onPress={onAddFolder} icon="folder" text="Add folder" />
      </View>
    </View>
  );
}

type ActionButtonProps = View['props'] & {
  onPress: () => void;
  icon: string;
  text: string;
};

const ActionButton = ({ onPress, icon, text, ...props }: ActionButtonProps) => {
  const { theme } = useTheme();
  return (
    <Card {...props} className="dark:bg-neutral-950 dark:shadow-neutral-900">
      <TouchableHighlight
        underlayColor={theme == 'dark' ? 'black' : '#f3f4f6'}
        className="flex-row p-2 justify-between rounded-xl"
        onPress={onPress}
      >
        <View className="flex-row items-center space-x-2">
          <Feather
            name={icon as any}
            size={24}
            color={theme == 'dark' ? 'white' : 'black'}
          />
          <Text className="dark:text-white">{text}</Text>
        </View>
      </TouchableHighlight>
    </Card>
  );
};
