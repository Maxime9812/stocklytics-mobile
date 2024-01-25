import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch } from '../../store-hooks';
import { logoutUseCase } from '../../core/auth/hexagon/usecases/logout/logout.usecase';
import { HomeTabScreenProps } from '../../navigation/HomeNavigation';

export default function HomeScreen({
  navigation,
}: HomeTabScreenProps<'Dashboard'>) {
  const appDispatch = useAppDispatch();
  const logout = async () => {
    await appDispatch(logoutUseCase());
    navigation.replace('Auth', { screen: 'Welcome' });
  };

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Text>Home</Text>
    </View>
  );
}
