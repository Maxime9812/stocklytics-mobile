import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-500">Home</Text>
      <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded">
        <Text className="text-white">Login</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
