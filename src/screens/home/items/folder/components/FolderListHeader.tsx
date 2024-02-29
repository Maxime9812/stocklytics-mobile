import { Text, View } from 'react-native';
import Card from '../../../../../components/cards/Card';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('home');
  return (
    <Card className="flex-row justify-between p-3">
      <Item name={t('items.folders')} value={`${totalFolders}`} />
      <Item name={t('items.items')} value={`${totalItems}`} />
      <Item name={t('items.totalQuantity')} value={`${totalQuantity}`} />
    </Card>
  );
}

type ItemProps = {
  name: string;
  value: string;
};
const Item = ({ name, value }: ItemProps) => {
  return (
    <View className="space-y-2">
      <Text className="text-neutral-500 dark:text-neutral-400">{name}</Text>
      <Text className="font-bold dark:text-white">{value}</Text>
    </View>
  );
};
