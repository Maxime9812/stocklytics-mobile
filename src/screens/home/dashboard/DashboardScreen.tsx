import React from 'react';
import { Text, View } from 'react-native';
import { HomeTabScreenProps } from '../../../navigation/HomeNavigation';
import BaseLayout from '../../../components/layouts/BaseLayout';
import Card from '../../../components/cards/Card';

export default function DashboardScreen({}: HomeTabScreenProps<'Dashboard'>) {
  return (
    <BaseLayout>
      <View className="p-4">
        <Card>
          <Text>Inventory summary</Text>
        </Card>
      </View>
    </BaseLayout>
  );
}
