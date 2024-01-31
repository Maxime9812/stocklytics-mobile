import { Text, View } from 'react-native';
import Card from '../../../../../components/cards/Card';

type FolderListHeaderProps = {
  totalFolders: number;
  totalItems: number;
  totalQuantity: number;
};
export default function FolderListHeader({
  totalFolders,
  totalItems,
  totalQuantity,
}: FolderListHeaderProps) {
  return (
    <Card>
      <View className="flex-row justify-between p-2">
        <View>
          <Text className="text-lg dark:text-white">Folders</Text>
          <Text className="text-lg font-bold dark:text-white">
            {totalFolders}
          </Text>
        </View>

        <View>
          <Text className="text-lg dark:text-white">Items</Text>
          <Text className="text-lg font-bold dark:text-white">
            {totalItems}
          </Text>
        </View>

        <View>
          <Text className="text-lg dark:text-white">Total Qty</Text>
          <Text className="text-lg font-bold dark:text-white">
            {totalQuantity}
          </Text>
        </View>
      </View>
    </Card>
  );
}
