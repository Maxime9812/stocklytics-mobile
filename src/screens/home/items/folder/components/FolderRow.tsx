import { Text, TouchableHighlight, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../../../hooks/use-theme';

type ItemRowProps = {
  goToFolder: (folderId: string) => void;
  folder: {
    id: string;
    name: string;
    quantity: number;
  };
};
export default function FolderRow({
  goToFolder,
  folder: { id, quantity, name },
}: ItemRowProps) {
  const { theme } = useTheme();
  return (
    <TouchableHighlight
      underlayColor={theme == 'dark' ? '#262626' : '#f3f4f6'}
      className="flex-row p-2 justify-between rounded-xl"
      onPress={() => goToFolder(id)}
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
    </TouchableHighlight>
  );
}
