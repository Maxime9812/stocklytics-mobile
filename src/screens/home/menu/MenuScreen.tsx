import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { HomeTabScreenProps } from '../../../navigation/HomeNavigation';
import { useAppDispatch } from '../../../store-hooks';
import { logoutUseCase } from '../../../core/auth/hexagon/usecases/logout/logout.usecase';
import BaseLayout from '../../../components/layouts/BaseLayout';

export default function MenuScreen({ navigation }: HomeTabScreenProps<'Menu'>) {
  const appDispatch = useAppDispatch();
  const logout = async () => {
    await appDispatch(logoutUseCase());
    navigation.replace('Auth', { screen: 'Welcome' });
  };

  return (
    <BaseLayout>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Text>Menu</Text>
    </BaseLayout>
  );
}
