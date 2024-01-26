import React from 'react';
import { Text } from 'react-native';
import { HomeTabScreenProps } from '../../../navigation/HomeNavigation';
import BaseLayout from '../../../components/layouts/BaseLayout';

export default function DashboardScreen({}: HomeTabScreenProps<'Dashboard'>) {
  return (
    <BaseLayout>
      <Text>Dashboard</Text>
    </BaseLayout>
  );
}
