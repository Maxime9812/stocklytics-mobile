import { Animated, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { useRef } from 'react';
import Button from '../../../../../components/buttons/Button';
import { styled } from 'nativewind';
import Badge from '../../../../../components/badge/Badge';

type ItemRowProps = {
  onPress: (itemId: string) => void;
  onDelete: (itemId: string) => void;
  item: {
    id: string;
    name: string;
    quantity: number;
    tags: { id: string; name: string }[];
  };
};
export default function ItemRow({
  onPress,
  onDelete,
  item: { id, name, quantity, tags },
}: ItemRowProps) {
  const swipeableRef = useRef<Swipeable>(null);

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
      renderRightActions={(progressAnimatedValue, dragAnimatedValue) => {
        return (
          <ItemActions
            onPress={onDeleteHandler}
            progress={progressAnimatedValue}
          />
        );
      }}
    >
      <Button
        variant="ghost"
        className="justify-between"
        onPress={() => onPress(id)}
      >
        <View className="flex-row space-x-2">
          <View className="rounded-xl bg-neutral-300 dark:bg-neutral-700 w-20 h-20 justify-center items-center">
            <Text className="text-neutral-50">
              <Feather name="file" size={36} />
            </Text>
          </View>
          <View className="flex-col justify-between">
            <Text className="text-lg font-bold dark:text-white">{name}</Text>
            <Text className="text-neutral-500">{quantity} unit</Text>
            <View className="flex-row space-x-2">
              {tags.map((tag) => (
                <Badge key={tag.id} size="sm">
                  {tag.name}
                </Badge>
              ))}
            </View>
          </View>
        </View>
      </Button>
    </Swipeable>
  );
}

type ItemActionsProps = {
  onPress: () => void;
  progress: Animated.AnimatedInterpolation<string | number>;
};

const ActionIcon = styled(Feather, 'text-lg text-white');

const ItemActions = ({ onPress, progress }: ItemActionsProps) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });

  return (
    <View style={{ width: 60 }}>
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <Button
          type="destructive"
          className="flex-1 rounded-l-none rounded-r-xl justify-center"
          onPress={onPress}
        >
          <ActionIcon name="trash" />
        </Button>
      </Animated.View>
    </View>
  );
};
