import React from 'react';
import { Text, View } from 'react-native';
import { HomeTabScreenProps } from '../../../navigation/HomeNavigation';

export default function SearchScreen({}: HomeTabScreenProps<'Search'>) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Search</Text>
    </View>
  );
}
