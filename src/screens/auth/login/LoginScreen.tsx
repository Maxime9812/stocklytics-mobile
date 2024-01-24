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
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { AuthStackScreenProps } from '../../../navigation/NavigationProvider';
import { useAppDispatch } from '../../../store-hooks';
import { loginUseCase } from '../../../core/auth/hexagon/usecases/login/login.usecase';

const loginFormSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

type LoginFormValues = InferType<typeof loginFormSchema>;

export default function LoginScreen({
  navigation,
}: AuthStackScreenProps<'Login'>) {
  const appDispatch = useAppDispatch();
  const { control, handleSubmit, formState, setFocus, getValues } =
    useForm<LoginFormValues>({
      resolver: yupResolver(loginFormSchema),
    });

  const disableSubmit = !formState.isValid;

  const onSubmit = (values: LoginFormValues) => {
    appDispatch(loginUseCase(values));
  };

  const focusOnTransitionEnd = () => {
    return navigation.addListener('transitionEnd', (e) => {
      if (e.data.closing) return;
      setFocus('email');
    });
  };

  useEffect(() => {
    return focusOnTransitionEnd();
  }, [focusOnTransitionEnd]);

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
          <View className="space-y-2">
            <TouchableOpacity
              onPress={() =>
                navigation.push('ResetPassword', { email: getValues('email') })
              }
            >
              <Text className="text-blue-500 text-center">
                Forgot password ?
              </Text>
            </TouchableOpacity>
            <Text className="text-center">
              By using the app, you agree to stocklytics's Terms & Conditions
              and Privacy Policy
            </Text>
          </View>
          <TouchableOpacity
            className={`bg-red-400 py-4 rounded ${disableSubmit && 'opacity-50'}`}
            onPress={handleSubmit(onSubmit)}
            disabled={disableSubmit}
          >
            <Text className="text-white text-center">Continue</Text>
          </TouchableOpacity>
          <View className="flex flex-row justify-center space-x-1">
            <Text>New here ?</Text>
            <TouchableOpacity onPress={() => navigation.replace('Register')}>
              <Text className="text-blue-500">Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
