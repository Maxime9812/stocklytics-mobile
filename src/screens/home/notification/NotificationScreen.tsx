import React from 'react';
import { Text } from 'react-native';
import { HomeTabScreenProps } from '../../../navigation/HomeNavigation';
import BaseLayout from '../../../components/layouts/BaseLayout';

export default function NotificationScreen({}: HomeTabScreenProps<'Notifications'>) {
  return (
    <BaseLayout>
      <Text>Notification</Text>
    </BaseLayout>
  );
}
