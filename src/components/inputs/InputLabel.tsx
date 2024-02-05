import { PropsWithChildren } from 'react';
import { Text } from 'react-native';

export const InputLabel = ({ children }: PropsWithChildren) => {
  return <Text className="mb-2 font-medium dark:text-white">{children}</Text>;
};
