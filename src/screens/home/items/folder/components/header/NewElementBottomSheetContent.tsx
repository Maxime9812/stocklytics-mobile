import { Text, View } from 'react-native';
import Card from '../../../../../../components/cards/Card';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from '../../../../../../hooks/use-theme';
import Button from '../../../../../../components/buttons/Button';
import { styled } from 'nativewind';

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

const ActionIcon = styled(Feather, 'dark:text-white text-lg');

const ActionButton = ({ onPress, icon, text, ...props }: ActionButtonProps) => {
  const { theme } = useTheme();
  return (
    <Card
      {...props}
      className="dark:bg-neutral-950 dark:shadow-neutral-900 p-1"
    >
      <Button variant="ghost" onPress={onPress}>
        <View className="flex-row items-center space-x-2">
          <ActionIcon name={icon as any} />
          <Button.Text>{text}</Button.Text>
        </View>
      </Button>
    </Card>
  );
};
