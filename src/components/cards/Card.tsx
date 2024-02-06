import { PropsWithChildren } from 'react';
import { View } from 'react-native';

export default function Card({
  children,
  ...props
}: PropsWithChildren<View['props']>) {
  return (
    <View
      {...props}
      className={`bg-white shadow-md shadow-neutral-100 dark:shadow-none rounded-xl p-2 dark:bg-neutral-900 ${props.className}`}
    >
      {children}
    </View>
  );
}

Card.Header = ({ children, ...props }: PropsWithChildren<View['props']>) => {
  return (
    <View
      {...props}
      className={`flex-row items-center mb-2 ${props.className}`}
    >
      {children}
    </View>
  );
};
