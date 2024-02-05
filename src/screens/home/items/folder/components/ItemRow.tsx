import { Text, TouchableHighlight, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../../../hooks/use-theme';
import { Swipeable } from 'react-native-gesture-handler';
import { useRef } from 'react';
import Button from '../../../../../components/buttons/Button';

type ItemRowProps = {
  onPress: (itemId: string) => void;
  onDelete: (itemId: string) => void;
  item: {
    id: string;
    name: string;
    quantity: number;
  };
};
export default function ItemRow({
  onPress,
  onDelete,
  item: { id, name, quantity },
}: ItemRowProps) {
  const swipeableRef = useRef<Swipeable>(null);

  const { theme } = useTheme();

  const onDeleteHandler = () => {
    swipeableRef.current?.close();
    onDelete(id);
  };

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={() => {
        return <ItemActions onPress={onDeleteHandler} />;
      }}
    >
      <Button
        variant="ghost"
        className="justify-between"
        onPress={() => onPress(id)}
      >
        <View className="flex-row space-x-2">
          <View className="rounded-xl bg-neutral-300 dark:bg-neutral-700 w-20 h-20 justify-center items-center">
            <Feather
              name="file"
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

type ItemActionsProps = {
  onPress: () => void;
};

const ItemActions = ({ onPress }: ItemActionsProps) => {
  return (
    <TouchableHighlight
      className="bg-red-400 justify-center px-5 rounded-r-xl"
      onPress={onPress}
    >
      <Feather name="trash" size={24} color="white" />
    </TouchableHighlight>
  );
};
