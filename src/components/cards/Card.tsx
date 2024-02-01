import { PropsWithChildren } from 'react';
import { View } from 'react-native';

export default function Card({
  children,
  ...props
}: PropsWithChildren<View['props']>) {
  return (
    <View
      className="bg-white ligth:shadow-sm shadow-gray-100 rounded-xl p-1 dark:bg-neutral-900"
      {...props}
    >
      {children}
    </View>
  );
}
