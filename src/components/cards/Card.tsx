import { PropsWithChildren } from 'react';
import { View } from 'react-native';

export default function Card({ children }: PropsWithChildren) {
  return (
    <View className="bg-white ligth:shadow-sm shadow-gray-100 rounded-xl p-2 dark:bg-neutral-900">
      {children}
    </View>
  );
}
