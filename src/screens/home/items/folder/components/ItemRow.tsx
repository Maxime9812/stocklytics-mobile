import { Animated, Text, View, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { useRef } from 'react';
import Button from '../../../../../components/buttons/Button';
import { styled } from 'nativewind';
import Badge from '../../../../../components/badge/Badge';
import { useTranslation } from 'react-i18next';

type ItemRowProps = {
  onPress: (itemId: string) => void;
  onDelete: (itemId: string) => void;
  onMove: (itemId: string) => void;
  item: {
    id: string;
    name: string;
    quantity: number;
    imageUrl?: string;
    tags: { id: string; name: string }[];
  };
};
export default function ItemRow({
  onPress,
  onDelete,
  onMove,
  item: { id, name, quantity, tags, imageUrl },
}: ItemRowProps) {
  const swipeableRef = useRef<Swipeable>(null);
  const { t } = useTranslation('home');

  const onDeleteHandler = () => {
    swipeableRef.current?.close();
    onDelete(id);
  };

  const onMoveHandler = () => {
    swipeableRef.current?.close();
    onMove(id);
  };

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      overshootRight={false}
      renderRightActions={(progressAnimatedValue) => {
        return (
          <ItemActions
            onDelete={onDeleteHandler}
            onMove={onMoveHandler}
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
        <View className="flex-row space-x-2 p-1">
          <View className="rounded-xl bg-neutral-300 dark:bg-neutral-700 w-20 h-20 justify-center items-center overflow-hidden">
            {imageUrl && (
              <Image
                source={{ uri: imageUrl }}
                className="w-full h-full"
              ></Image>
            )}
            {!imageUrl && (
              <Text className="text-neutral-50">
                <Feather name="file" size={36} />
              </Text>
            )}
          </View>
          <View className="flex-col justify-between flex-1">
            <Text className="text-lg font-bold dark:text-white">{name}</Text>
            <Text className="text-neutral-500">
              {t('items.unit', { count: quantity })}
            </Text>
            <View className="flex-row flex-wrap gap-2">
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
  onDelete: () => void;
  onMove: () => void;
  progress: Animated.AnimatedInterpolation<string | number>;
};

const ActionIcon = styled(Feather, 'text-lg text-white');

const ItemActions = ({ onDelete, onMove, progress }: ItemActionsProps) => {
  const actionWith = 60;
  const actionsCount = 2;
  const outputRange = actionWith * actionsCount;
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [outputRange, 0],
  });

  return (
    <View className="flex-row">
      <View style={{ width: actionWith }}>
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <Button
            variant="ghost"
            className="flex-1 rounded-none justify-center items-center bg-neutral-500"
            onPress={onMove}
          >
            <ActionIcon name="folder" />
          </Button>
        </Animated.View>
      </View>
      <View style={{ width: actionWith }}>
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <Button
            type="destructive"
            className="flex-1 rounded-none justify-center"
            onPress={onDelete}
          >
            <ActionIcon name="trash" />
          </Button>
        </Animated.View>
      </View>
    </View>
  );
};
