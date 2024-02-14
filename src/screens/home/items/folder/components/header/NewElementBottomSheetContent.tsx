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
    <View className="p-3 space-y-4 mb-4">
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

const ActionIcon = styled(Feather, 'text-lg');

const ActionButton = ({ onPress, icon, text, ...props }: ActionButtonProps) => {
  return (
    <Card
      {...props}
      className="dark:bg-neutral-950 dark:shadow-neutral-900 p-1"
    >
      <Button variant="ghost" onPress={onPress}>
        <Button.Icon>
          <ActionIcon name={icon as any} />
        </Button.Icon>
        <Button.Text>{text}</Button.Text>
      </Button>
    </Card>
  );
};
