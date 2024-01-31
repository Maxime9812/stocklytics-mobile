import { Text, View } from 'react-native';
import { createAvatarViewModel } from './avatar.viewmodel';

export type AvatarProps = {
  name: string;
};

export default function Avatar({ name }: AvatarProps) {
  const { initials } = createAvatarViewModel({ name });
  return (
    <View className="bg-neutral-500 dark:bg-neutral-400 p-4 rounded-full">
      <Text className="font-bold text-white text-xl">{initials}</Text>
    </View>
  );
}
