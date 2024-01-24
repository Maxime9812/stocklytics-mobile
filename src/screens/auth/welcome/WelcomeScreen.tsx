import { StatusBar } from 'expo-status-bar';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import WelcomeBackground1 from '../../../../assets/welcome-background-1.png';
import { AuthStackScreenProps } from '../../../navigation/NavigationProvider';

export default function WelcomeScreen({
  navigation,
}: AuthStackScreenProps<'Welcome'>) {
  const { push } = navigation;

  return (
    <SafeAreaView className="bg-white h-screen">
      <StatusBar style="auto" />
      <View className="p-4 flex  h-full">
        <Text className="text-2xl font-bold text-center">Stocklytics</Text>
        <Image source={WelcomeBackground1} className="flex-1 w-full h-full" />

        <View className="space-y-2">
          <TouchableOpacity onPress={() => push('Register')}>
            <View className="bg-red-400 p-4 rounded">
              <Text className="text-white text-center font-bold">
                Get Started
              </Text>
            </View>
          </TouchableOpacity>

          <View className="flex flex-row justify-center space-x-1">
            <Text>Already have an account ?</Text>
            <TouchableOpacity onPress={() => push('Login')}>
              <Text className="text-blue-500">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
