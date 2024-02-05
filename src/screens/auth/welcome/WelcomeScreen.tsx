import { Image, Text, View } from 'react-native';
import WelcomeBackground1 from '../../../../assets/welcome-background-1.png';
import CloseKeyboardOnTouch from '../../../components/CloseKeyboardOnTouch';
import { AuthStackScreenProps } from '../../../navigation/AuthStackNavigation';
import BaseLayout from '../../../components/layouts/BaseLayout';
import Button from '../../../components/buttons/Button';

export default function WelcomeScreen({
  navigation,
}: AuthStackScreenProps<'Welcome'>) {
  const goToLogin = () => navigation.push('Login');
  const goToRegister = () => navigation.push('Register');

  return (
    <BaseLayout>
      <CloseKeyboardOnTouch>
        <View className="p-4 flex h-full">
          <Text className="text-2xl font-bold text-center dark:text-white">
            Welcome to Stocklytics
          </Text>
          <Image source={WelcomeBackground1} className="flex-1 w-full h-full" />
          <View className="space-y-2">
            <Button onPress={goToRegister}>
              <Button.Text>Get Started</Button.Text>
            </Button>
            <View className="flex flex-row justify-center space-x-1">
              <Text className="dark:text-white">Already have an account ?</Text>
              <Button variant="link" onPress={goToLogin}>
                <Button.Text>Sign in</Button.Text>
              </Button>
            </View>
          </View>
        </View>
      </CloseKeyboardOnTouch>
    </BaseLayout>
  );
}
