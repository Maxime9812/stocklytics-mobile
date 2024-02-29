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
import Button from '../../../components/buttons/Button';
import { styled } from 'nativewind';
import { AuthUser } from '../../../core/auth/hexagon/models/auth-user';
import { useTranslation } from 'react-i18next';

const LogoutIcon = styled(MaterialIcons, 'text-lg');
export default function MenuScreen({ navigation }: HomeTabScreenProps<'Menu'>) {
  const authUser = useSelector(authUserSelector);

  return (
    <BaseLayout>
      <View className="p-4 space-y-4">
        {authUser && <UserInfos user={authUser} />}
        <View>
          <Actions navigation={navigation} />
        </View>
      </View>
    </BaseLayout>
  );
}

const UserInfos = ({ user }: { user: AuthUser }) => (
  <View className="items-center space-y-4">
    <Avatar name={user.fullName} />
    <View className="items-center">
      <Text className="text-xl font-bold dark:text-white">{user.fullName}</Text>
      <Text className="text-neutral-400 dark:text-neutral-500">
        {user.email}
      </Text>
    </View>
  </View>
);

type ActionsProps = {
  navigation: HomeTabScreenProps<'Menu'>['navigation'];
};

const Actions = ({ navigation }: ActionsProps) => (
  <Card className="p-1">
    <LogoutButton navigation={navigation} />
  </Card>
);

type LogoutButtonProps = {
  navigation: HomeTabScreenProps<'Menu'>['navigation'];
};

const LogoutButton = ({ navigation }: LogoutButtonProps) => {
  const { t } = useTranslation('home');
  const appDispatch = useAppDispatch();

  const logout = async () => {
    await appDispatch(logoutUseCase());
    navigation.replace('Auth', { screen: 'Welcome' });
  };

  const requestLogout = () => {
    if (Platform.OS === 'android') {
      Alert.alert(t('menu.signOut.message'), '', [
        { text: t('menu.signOut.cancel'), style: 'cancel' },
        { text: t('menu.signOut.confirm'), onPress: logout },
      ]);
      return;
    }
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: t('menu.signOut.title'),
        message: t('menu.signOut.message'),
        options: [t('menu.signOut.confirm'), t('menu.signOut.cancel')],
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
    <Button variant="ghost" onPress={requestLogout}>
      <Button.Icon>
        <LogoutIcon name="logout" />
      </Button.Icon>
      <Button.Text>{t('menu.signOut.button')}</Button.Text>
    </Button>
  );
};
