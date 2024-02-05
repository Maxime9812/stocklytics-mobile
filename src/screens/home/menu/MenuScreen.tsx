import React from 'react';
import { ActionSheetIOS, Alert, Platform, Text, View } from 'react-native';
import { HomeTabScreenProps } from '../../../navigation/HomeNavigation';
import { useAppDispatch } from '../../../store-hooks';
import { logoutUseCase } from '../../../core/auth/hexagon/usecases/logout/logout.usecase';
import BaseLayout from '../../../components/layouts/BaseLayout';
import { useSelector } from 'react-redux';
import { authUserSelector } from '../../../core/auth/auth.slice';
import Avatar from '../../../components/avatar/Avatar';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../../components/cards/Card';
import { useTheme } from '../../../hooks/use-theme';
import { styled } from 'nativewind';
import Button from '../../../components/buttons/Button';

const LogoutIcon = styled(MaterialIcons, 'dark:text-white text-lg');
export default function MenuScreen({ navigation }: HomeTabScreenProps<'Menu'>) {
  const appDispatch = useAppDispatch();
  const { theme } = useTheme();
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
      <View className="p-4 space-y-4">
        {authUser && (
          <View className="items-center space-y-4">
            <Avatar name={authUser.fullName} />
            <View className="items-center">
              <Text className="text-xl font-bold dark:text-white">
                {authUser.fullName}
              </Text>
              <Text className="text-lg text-neutral-400">{authUser.email}</Text>
            </View>
          </View>
        )}
        <View>
          <Card className="p-1">
            <Button variant="ghost" onPress={requestLogout}>
              <LogoutIcon name="logout" />
              <Button.Text>Sign out</Button.Text>
            </Button>
          </Card>
        </View>
      </View>
    </BaseLayout>
  );
}
