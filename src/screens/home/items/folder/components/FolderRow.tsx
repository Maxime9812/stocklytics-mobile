import { Animated, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import Button from '../../../../../components/buttons/Button';
import { styled } from 'nativewind';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

type ItemRowProps = {
  onPress: (folderId: string) => void;
  onDelete: (folderId: string) => void;
  folder: {
    id: string;
    name: string;
    quantity: number;
  };
};
export default function FolderRow({
  onPress,
  onDelete,
  folder: { id, quantity, name },
}: ItemRowProps) {
  const swipeableRef = useRef<Swipeable>(null);
  const { t } = useTranslation('home');

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
      overshootRight={false}
      renderRightActions={(progress) => (
        <FolderActions onPress={onDeleteHandler} progress={progress} />
      )}
    >
      <Button
        variant="ghost"
        className="justify-between"
        onPress={() => onPress(id)}
      >
        <View className="flex-row space-x-2 p-1">
          <View className="rounded-xl bg-neutral-300 dark:bg-neutral-700 w-20 h-20 justify-center items-center">
            <Text className="text-neutral-50">
              <Feather name="folder" size={36} />
            </Text>
          </View>
          <View className="space-y-2">
            <Text className="text-lg font-bold dark:text-white">{name}</Text>
            <Text className="text-neutral-500">
              {t('items.unit', { count: quantity })}
            </Text>
          </View>
        </View>
      </Button>
    </Swipeable>
  );
}

type FolderActionsProps = {
  onPress: () => void;
  progress: Animated.AnimatedInterpolation<string | number>;
};

const ActionIcon = styled(Feather, 'text-lg text-white');

const FolderActions = ({ onPress, progress }: FolderActionsProps) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });

  return (
    <View style={{ width: 60 }}>
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <Button
          type="destructive"
          className="flex-1 rounded-none justify-center"
          onPress={onPress}
        >
          <ActionIcon name="trash" />
        </Button>
      </Animated.View>
    </View>
  );
};
