import { Text } from 'react-native';
import { useEffect, useState } from 'react';
import { RootStackScreenProps } from '../navigation/NavigationProvider';
import {
  hasCheckedAuthStateSelector,
  isAuthSelector,
} from '../core/auth/auth.slice';
import { useSelector } from 'react-redux';
import BaseLayout from '../components/layouts/BaseLayout';

export default function SplashScreen({
  navigation,
}: RootStackScreenProps<'Splash'>) {
  const isAuth = useSelector(isAuthSelector);
  const hasCheckedAuth = useSelector(hasCheckedAuthStateSelector);
  const [transitionIsDone, setTransitionIsDone] = useState(false);

  useEffect(() => {
    return navigation.addListener('transitionEnd', (e) => {
      if (e.data.closing) return;
      setTransitionIsDone(true);
    });
  }, [navigation]);

  useEffect(() => {
    if (!hasCheckedAuth || !transitionIsDone) return;
    if (isAuth) {
      return navigation.replace('Home', {
        screen: 'Items',
        params: { screen: 'Folder' },
      });
    }
    return navigation.replace('Auth', { screen: 'Welcome' });
  }, [isAuth, hasCheckedAuth, transitionIsDone]);

  return (
    <BaseLayout className="justify-center">
      <Text className="dark:text-white text-center font-bold text-2xl">
        Stocklytics
      </Text>
    </BaseLayout>
  );
}
