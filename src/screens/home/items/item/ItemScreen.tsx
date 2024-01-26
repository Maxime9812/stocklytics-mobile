import React from 'react';
import { Text } from 'react-native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../components/layouts/BaseLayout';

export default function ItemScreen({}: ItemsStackScreenProps<'Item'>) {
  return (
    <BaseLayout>
      <Text>Item</Text>
    </BaseLayout>
  );
}
