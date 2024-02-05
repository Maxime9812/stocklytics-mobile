import { Text, TouchableHighlight, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../../../hooks/use-theme';
import { Swipeable } from 'react-native-gesture-handler';
import Button from '../../../../../components/buttons/Button';

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
  const { theme } = useTheme();
  return (
    <Swipeable
      renderRightActions={() => <FolderActions id={id} onDelete={onDelete} />}
    >
      <Button
        variant="ghost"
        className="justify-between"
        onPress={() => onPress(id)}
      >
        <View className="flex-row space-x-2">
          <View className="rounded-xl bg-neutral-300 dark:bg-neutral-700 w-20 h-20 justify-center items-center">
            <Feather
              name="folder"
              size={48}
              color={theme == 'dark' ? '#f3f4f6' : 'white'}
            />
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

const FolderActions = ({ id, onDelete }: FolderActionsProps) => {
  return (
    <TouchableHighlight
      className="bg-red-400 justify-center px-5 rounded-r-xl"
      onPress={() => onDelete(id)}
    >
      <Feather name="trash" size={24} color="white" />
    </TouchableHighlight>
  );
};
