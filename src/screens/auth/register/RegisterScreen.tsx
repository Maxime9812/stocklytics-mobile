import { StatusBar } from 'expo-status-bar';
import {
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { AuthStackScreenProps } from '../../../navigation/NavigationProvider';

const registerFormSchema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

type RegisterFormValues = InferType<typeof registerFormSchema>;

export default function RegisterScreen({
  navigation,
}: AuthStackScreenProps<'Register'>) {
  const { addListener, replace } = navigation;

  const { control, handleSubmit, formState, setFocus } =
    useForm<RegisterFormValues>({
      resolver: yupResolver(registerFormSchema),
    });

  const disableSubmit = !formState.isValid;

  const onSubmit = (data: RegisterFormValues) => {
    console.log(data);
  };

  useEffect(() => {
    return addListener('transitionEnd', (e) => {
      if (e.data.closing) return;
      setFocus('fullName');
    });
  }, [addListener]);

  return (
    <SafeAreaView className="bg-white">
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="p-4 flex h-screen space-y-2">
          <Text className="text-2xl font-bold text-center">Stocklytics</Text>
          <View className="flex items-center">
            <Text className="text-2xl font-bold">Create an account</Text>
            <Text className="text-xl">Get started for free today</Text>
          </View>
          <View className="space-y-4">
            <View>
              <Text className="mb-2 font-medium">Full Name</Text>
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    onChangeText={field.onChange}
                    autoCapitalize="words"
                    placeholder="John Doe"
                    textContentType="name"
                    className="bg-gray-50 border border-gray-300 rounded p-4 focus:border-blue-500"
                    returnKeyType="next"
                    onSubmitEditing={() => setFocus('email')}
                  />
                )}
                name="fullName"
              />
            </View>
            <View>
              <Text className="mb-2 font-medium">Email</Text>
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    onChangeText={field.onChange}
                    autoCapitalize="none"
                    placeholder="john.doe@gmail.com"
                    textContentType="emailAddress"
                    className="bg-gray-50 border border-gray-300 rounded p-4 focus:border-blue-500"
                    returnKeyType="next"
                    onSubmitEditing={() => setFocus('password')}
                  />
                )}
                name="email"
              />
            </View>
            <View>
              <Text className="mb-2 font-medium">Password</Text>
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    onChangeText={field.onChange}
                    placeholder="••••••••"
                    textContentType="password"
                    secureTextEntry
                    className="bg-gray-50 border border-gray-300 rounded p-4 focus:border-blue-500"
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                )}
                name="password"
              />
            </View>
          </View>
          <Text className="text-center">
            By using the app, you agree to stocklytics's Terms & Conditions and
            Privacy Policy
          </Text>
          <TouchableOpacity
            className={`bg-red-400 py-4 rounded ${disableSubmit && 'opacity-50'}`}
            onPress={handleSubmit(onSubmit)}
            disabled={disableSubmit}
          >
            <Text className="text-white text-center">Create account</Text>
          </TouchableOpacity>
          <View className="flex flex-row justify-center space-x-1">
            <Text>Already have an account ?</Text>
            <TouchableOpacity onPress={() => replace('Login')}>
              <Text className="text-blue-500">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
