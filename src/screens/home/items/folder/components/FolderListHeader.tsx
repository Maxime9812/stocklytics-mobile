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
    <Card className="flex-row justify-between p-3">
      <Item name="Folders" value={`${totalFolders}`} />
      <Item name="Items" value={`${totalItems}`} />
      <Item name="Total Qty" value={`${totalQuantity}`} />
    </Card>
  );
}

type ItemProps = {
  name: string;
  value: string;
};
const Item = ({ name, value }: ItemProps) => {
  return (
    <View>
      <Text className="text-lg dark:text-white">{name}</Text>
      <Text className="text-lg font-bold dark:text-white">{value}</Text>
    </View>
  );
};
