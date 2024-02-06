import { Text, View } from 'react-native';
import { clsx } from 'clsx';

type BadgeProps = View['props'] & {
  size?: 'sm' | 'md';
};
export default function Badge({
  children,
  className,
  size = 'md',
  ...props
}: BadgeProps) {
  return (
    <View
      {...props}
      className={clsx(
        'bg-neutral-200 dark:bg-neutral-700 py-1 px-3 rounded-full',
        className,
      )}
    >
      <Text
        className={clsx(
          'dark:text-white',
          size == 'sm' && 'text-xs',
          size == 'md' && 'text-md',
        )}
      >
        {children}
      </Text>
    </View>
  );
}
