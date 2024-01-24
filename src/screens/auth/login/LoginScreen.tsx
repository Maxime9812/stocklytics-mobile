import {
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StackActions, useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const { dispatch } = useNavigation();

  return (
    <SafeAreaView className="bg-white">
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="p-4 flex h-screen space-y-2">
          <Text className="text-2xl font-bold text-center">Stocklytics</Text>
          <View className="flex items-center">
            <Text className="text-2xl font-bold">Welcome back !</Text>
            <Text className="text-xl">Login to your account</Text>
          </View>
          <View className="space-y-4">
            <View>
              <Text className="mb-2 font-medium">Email</Text>
              <TextInput
                placeholder="john.doe@gmail.com"
                textContentType="emailAddress"
                className="bg-gray-50 border border-gray-300 rounded p-4 focus:border-blue-500"
              />
            </View>
            <View>
              <Text className="mb-2 font-medium">Password</Text>
              <TextInput
                placeholder="••••••••"
                textContentType="password"
                secureTextEntry
                className="bg-gray-50 border border-gray-300 rounded p-4 focus:border-blue-500"
              />
            </View>
          </View>
          <View className="space-y-2">
            <TouchableOpacity>
              <Text className="text-blue-500 text-center">
                Forgot password ?
              </Text>
            </TouchableOpacity>
            <Text className="text-center">
              By using the app, you agree to stocklytics's Terms & Conditions
              and Privacy Policy
            </Text>
          </View>
          <TouchableOpacity className="bg-red-400 py-4 rounded">
            <Text className="text-white text-center">Continue</Text>
          </TouchableOpacity>
          <View className="flex flex-row justify-center space-x-1">
            <Text>New here ?</Text>
            <TouchableOpacity
              onPress={() => dispatch(StackActions.replace('register'))}
            >
              <Text className="text-blue-500">Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
