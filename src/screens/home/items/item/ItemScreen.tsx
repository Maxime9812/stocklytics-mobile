import React from 'react';
import { Text } from 'react-native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../components/layouts/BaseLayout';

export default function ItemScreen({
  route: {
    params: { id },
  },
}: ItemsStackScreenProps<'Item'>) {
  return (
    <BaseLayout>
      <Text>Item {id}</Text>
    </BaseLayout>
  );
}
