import { Text, TouchableHighlight, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

type ItemRowProps = {
  goToItem: (itemId: string) => void;
  item: {
    id: string;
    name: string;
    quantity: number;
  };
};
export default function ItemRow({ goToItem, item }: ItemRowProps) {
  return (
    <TouchableHighlight
      underlayColor="#f3f4f6"
      className="flex-row p-4 justify-between rounded-xl"
      onPress={() => goToItem(item.id)}
    >
      <View className="flex-row space-x-2">
        <View className="rounded-xl bg-gray-300 w-20 h-20 justify-center items-center">
          <Feather name="file" size={48} color="#f3f4f6" />
        </View>
        <View className="space-y-2">
          <Text className="text-lg font-bold">{item.name}</Text>
          <Text className="font-bold">{item.quantity} unit</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}
