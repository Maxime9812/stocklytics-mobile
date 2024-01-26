import React from 'react';
import { Text } from 'react-native';
import { HomeTabScreenProps } from '../../../navigation/HomeNavigation';
import BaseLayout from '../../../components/layouts/BaseLayout';

export default function SearchScreen({}: HomeTabScreenProps<'Search'>) {
  return (
    <BaseLayout>
      <Text>Search</Text>
    </BaseLayout>
  );
}
