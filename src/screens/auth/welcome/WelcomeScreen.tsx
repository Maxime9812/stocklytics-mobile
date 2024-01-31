import { Image, Text, TouchableOpacity, View } from 'react-native';
import WelcomeBackground1 from '../../../../assets/welcome-background-1.png';
import CloseKeyboardOnTouch from '../../../components/CloseKeyboardOnTouch';
import { AuthStackScreenProps } from '../../../navigation/AuthStackNavigation';
import BaseLayout from '../../../components/layouts/BaseLayout';

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
            <TouchableOpacity onPress={goToRegister}>
              <View className="bg-red-400 p-4 rounded-full ">
                <Text className="text-white text-center font-bold">
                  Get Started
                </Text>
              </View>
            </TouchableOpacity>
            <View className="flex flex-row justify-center space-x-1">
              <Text className="dark:text-white">Already have an account ?</Text>
              <TouchableOpacity onPress={goToLogin}>
                <Text className="text-blue-500">Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CloseKeyboardOnTouch>
    </BaseLayout>
  );
}
