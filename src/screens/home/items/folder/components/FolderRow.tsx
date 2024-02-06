import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import Button from '../../../../../components/buttons/Button';
import { styled } from 'nativewind';

type ItemRowProps = {
  onPress: (folderId: string) => void;
  onDelete: (folderId: string) => void;
  folder: {
    id: string;
    name: string;
    quantity: number;
  };
};
export default function FolderRow({
  onPress,
  onDelete,
  folder: { id, quantity, name },
}: ItemRowProps) {
  return (
    <Swipeable
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={() => <FolderActions id={id} onDelete={onDelete} />}
    >
      <Button
        variant="ghost"
        className="justify-between"
        onPress={() => onPress(id)}
      >
        <View className="flex-row space-x-2">
          <View className="rounded-xl bg-neutral-300 dark:bg-neutral-700 w-20 h-20 justify-center items-center">
            <Text className="text-neutral-50">
              <Feather name="folder" size={36} />
            </Text>
          </View>
          <View className="space-y-2">
            <Text className="text-lg font-bold dark:text-white">{name}</Text>
            <Text className="text-neutral-500">{quantity} unit</Text>
          </View>
        </View>
      </Button>
    </Swipeable>
  );
}

type FolderActionsProps = {
  id: string;
  onDelete: (itemId: string) => void;
};

const ActionIcon = styled(Feather, 'text-lg text-white');

const FolderActions = ({ id, onDelete }: FolderActionsProps) => {
  return (
    <Button
      type="destructive"
      className="px-5 rounded-l-none rounded-r-xl justify-center"
      onPress={() => onDelete(id)}
    >
      <Button.Icon>
        <ActionIcon name="trash" />
      </Button.Icon>
    </Button>
  );
};
