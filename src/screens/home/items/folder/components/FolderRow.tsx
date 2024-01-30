import { Text, TouchableOpacity, View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

type ItemRowProps = {
  goToFolder: (folderId: string) => void;
  folder: {
    id: string;
    name: string;
    quantity: number;
  };
};
export default function FolderRow({ goToFolder, folder }: ItemRowProps) {
  return (
    <TouchableOpacity
      className="border-b border-gray-100 flex-row p-4 justify-between"
      onPress={() => goToFolder(folder.id)}
    >
      <View className="flex-row space-x-2">
        <View className="rounded bg-gray-300 w-20 h-20 justify-center items-center">
          <Feather name="folder" size={48} color="#f3f4f6" />
        </View>
        <View className="space-y-2">
          <Text className="text-lg font-bold">{folder.name}</Text>
          <Text className="text-gray-500">{folder.quantity} unit</Text>
        </View>
      </View>
      <TouchableOpacity className="px-2">
        <MaterialCommunityIcons name="dots-horizontal" size={24} color="gray" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
