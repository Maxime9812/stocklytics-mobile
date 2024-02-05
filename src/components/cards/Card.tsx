import { PropsWithChildren } from 'react';
import { View } from 'react-native';

export default function Card({
  children,
  ...props
}: PropsWithChildren<View['props']>) {
  return (
    <View
      {...props}
      className={`bg-white shadow-sm shadow-neutral-100 dark:shadow-neutral-900 rounded-xl p-1 dark:bg-neutral-900 ${props.className}`}
    >
      {children}
    </View>
  );
}
