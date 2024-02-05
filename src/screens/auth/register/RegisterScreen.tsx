import { Text, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import CloseKeyboardOnTouch from '../../../components/CloseKeyboardOnTouch';
import BaseLayout from '../../../components/layouts/BaseLayout';
import { AuthStackScreenProps } from '../../../navigation/AuthStackNavigation';
import { useAppDispatch } from '../../../store-hooks';
import { registerUseCase } from '../../../core/auth/hexagon/usecases/register/register.usecase';
import { isRejected } from '@reduxjs/toolkit';
import BaseTextInput from '../../../components/inputs/BaseTextInput';
import { InputLabel } from '../../../components/inputs/InputLabel';

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
  const appDispatch = useAppDispatch();
  const { control, handleSubmit, formState, setFocus } =
    useForm<RegisterFormValues>({
      resolver: yupResolver(registerFormSchema),
    });

  const disableSubmit = !formState.isValid;

  const onSubmit = async (data: RegisterFormValues) => {
    const action = await appDispatch(registerUseCase(data));
    if (isRejected(action)) return;
    navigation.replace('Home', {
      screen: 'Items',
      params: { screen: 'Folder' },
    });
  };

  const focusOnTransitionEnd = () => {
    return navigation.addListener('transitionEnd', (e) => {
      if (e.data.closing) return;
      setFocus('fullName');
    });
  };

  const goToLogin = () => navigation.replace('Login');

  useEffect(() => {
    return focusOnTransitionEnd();
  }, [focusOnTransitionEnd]);

  return (
    <CloseKeyboardOnTouch>
      <BaseLayout>
        <View className="p-4 flex h-screen space-y-2">
          <Title />
          <View className="space-y-4">
            <View>
              <InputLabel>Full Name</InputLabel>
              <Controller
                control={control}
                render={({ field }) => (
                  <BaseTextInput
                    {...field}
                    onChangeText={field.onChange}
                    autoCapitalize="words"
                    placeholder="John Doe"
                    textContentType="name"
                    returnKeyType="next"
                    onSubmitEditing={() => setFocus('email')}
                  />
                )}
                name="fullName"
              />
            </View>
            <View>
              <InputLabel>Email</InputLabel>
              <Controller
                control={control}
                render={({ field }) => (
                  <BaseTextInput
                    {...field}
                    onChangeText={field.onChange}
                    autoCapitalize="none"
                    placeholder="john.doe@gmail.com"
                    textContentType="emailAddress"
                    returnKeyType="next"
                    onSubmitEditing={() => setFocus('password')}
                  />
                )}
                name="email"
              />
            </View>
            <View>
              <InputLabel>Password</InputLabel>
              <Controller
                control={control}
                render={({ field }) => (
                  <BaseTextInput
                    {...field}
                    onChangeText={field.onChange}
                    placeholder="••••••••"
                    textContentType="password"
                    secureTextEntry
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                )}
                name="password"
              />
            </View>
          </View>
          <Text className="text-center dark:text-white">
            By using the app, you agree to stocklytics's Terms & Conditions and
            Privacy Policy
          </Text>
          <TouchableOpacity
            className={`bg-red-400 py-4 rounded-full flex-row justify-center items-center space-x-1 ${disableSubmit && 'opacity-50'}`}
            onPress={handleSubmit(onSubmit)}
            disabled={disableSubmit}
          >
            <Text className="text-white text-center">Create account</Text>
          </TouchableOpacity>
          <View className="flex flex-row justify-center space-x-1">
            <Text className="dark:text-white">Already have an account ?</Text>
            <TouchableOpacity onPress={goToLogin}>
              <Text className="text-blue-500">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}

const Title = () => (
  <View className="flex items-center">
    <Text className="text-2xl font-bold dark:text-white">
      Create an account
    </Text>
    <Text className="text-xl text-neutral-400">Get started for free today</Text>
  </View>
);
