import React from 'react';
import {
  ActionSheetIOS,
  Alert,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { HomeTabScreenProps } from '../../../navigation/HomeNavigation';
import { useAppDispatch } from '../../../store-hooks';
import { logoutUseCase } from '../../../core/auth/hexagon/usecases/logout/logout.usecase';
import BaseLayout from '../../../components/layouts/BaseLayout';
import { useSelector } from 'react-redux';
import { authUserSelector } from '../../../core/auth/auth.slice';
import Avatar from '../../../components/avatar/Avatar';

export default function MenuScreen({ navigation }: HomeTabScreenProps<'Menu'>) {
  const appDispatch = useAppDispatch();
  const authUser = useSelector(authUserSelector);

  const logout = async () => {
    await appDispatch(logoutUseCase());
    navigation.replace('Auth', { screen: 'Welcome' });
  };

  const requestLogout = () => {
    if (Platform.OS === 'android') {
      Alert.alert('Are you sure you want to sign out ?', '', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign out', onPress: logout },
      ]);
      return;
    }
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Are you sure you want to sign out ?',
        message:
          'Please ensure your items & folders have been synced before signing out.',
        options: ['Sign out', 'Cancel'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          logout();
        }
      },
    );
  };

  return (
    <BaseLayout>
      {authUser && (
        <View className="items-center space-y-4">
          <Avatar name={authUser.fullName} />
          <View className="items-center">
            <Text className="text-xl font-bold">{authUser.fullName}</Text>
            <Text className="text-lg text-gray-400">{authUser.email}</Text>
          </View>
        </View>
      )}
      <TouchableOpacity onPress={requestLogout}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <Text>Menu</Text>
    </BaseLayout>
  );
}
