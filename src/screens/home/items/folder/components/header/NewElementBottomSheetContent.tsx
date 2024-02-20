import { Text, View } from 'react-native';
import Card from '../../../../../../components/cards/Card';
import { Feather } from '@expo/vector-icons';
import React from 'react';
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
    <View className="p-4 pt-0 space-y-4 mb-4">
      <View>
        <Text className="text-xl dark:text-white">Add</Text>
        <Text className="text-neutral-500 dark:text-neutral-400">
          Add item or folder to{' '}
          <Text className="text-black dark:text-white">{folderName}</Text>
        </Text>
      </View>

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

const ActionIcon = styled(Feather, 'text-lg');

const ActionButton = ({ onPress, icon, text, ...props }: ActionButtonProps) => {
  return (
    <Card {...props} type="secondary" className="p-1">
      <Button variant="ghost" type="secondary" onPress={onPress}>
        <Button.Icon>
          <ActionIcon name={icon as any} />
        </Button.Icon>
        <Button.Text>{text}</Button.Text>
      </Button>
    </Card>
  );
};
