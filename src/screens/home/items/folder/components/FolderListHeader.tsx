import { Text, View } from 'react-native';
import Card from '../../../../../components/cards/Card';

type FolderListHeaderProps = {
  foldersCount: number;
  itemsCount: number;
  totalQuantity: number;
};
export default function FolderListHeader({
  foldersCount,
  itemsCount,
  totalQuantity,
}: FolderListHeaderProps) {
  return (
    <Card>
      <View className="flex-row justify-between p-2">
        <View>
          <Text className="text-lg text-gray-500">Folders</Text>
          <Text className="text-lg font-bold">{foldersCount}</Text>
        </View>

        <View>
          <Text className="text-lg text-gray-500">Items</Text>
          <Text className="text-lg font-bold">{itemsCount}</Text>
        </View>

        <View>
          <Text className="text-lg text-gray-500">Total Qty</Text>
          <Text className="text-lg font-bold">{totalQuantity}</Text>
        </View>
      </View>
    </Card>
  );
}
