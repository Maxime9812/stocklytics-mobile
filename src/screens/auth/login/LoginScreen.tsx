import { Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../store-hooks';
import CloseKeyboardOnTouch from '../../../components/CloseKeyboardOnTouch';
import { isRejected } from '@reduxjs/toolkit';
import { AuthStackScreenProps } from '../../../navigation/AuthStackNavigation';
import { createLoginScreenViewModel } from './login-screen.viewmodel';
import FeatherIcon from '@expo/vector-icons/Feather';
import BaseTextInput from '../../../components/inputs/BaseTextInput';
import BaseLayout from '../../../components/layouts/BaseLayout';
import { InputLabel } from '../../../components/inputs/InputLabel';
import Button from '../../../components/buttons/Button';
import { styled } from 'nativewind';

const loginFormSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

type LoginFormValues = InferType<typeof loginFormSchema>;

const LoadingIcon = styled(FeatherIcon, 'text-white');

export default function LoginScreen({
  navigation,
}: AuthStackScreenProps<'Login'>) {
  const appDispatch = useAppDispatch();
  const { login } = createLoginScreenViewModel(appDispatch)();
  const { control, handleSubmit, formState, setFocus, getValues, resetField } =
    useForm<LoginFormValues>({
      resolver: yupResolver(loginFormSchema),
    });

  const isLoading = formState.isSubmitting;
  const disableSubmit = !formState.isValid || isLoading;

  const onWrongCredentials = () => {
    resetField('password');
    setFocus('password');
  };

  const onSubmit = async (values: LoginFormValues) => {
    const action = await login(values);
    if (isRejected(action)) {
      return onWrongCredentials();
    }

    navigation.replace('Home', {
      screen: 'Items',
      params: { screen: 'Folder' },
    });
  };

  const focusOnTransitionEnd = () => {
    return navigation.addListener('transitionEnd', (e) => {
      if (e.data.closing) return;
      setFocus('email');
    });
  };

  const goToResetPassword = () =>
    navigation.push('ResetPassword', { email: getValues('email') });

  const goToRegister = () => navigation.replace('Register');

  useEffect(() => {
    return focusOnTransitionEnd();
  }, [focusOnTransitionEnd]);

  return (
    <CloseKeyboardOnTouch>
      <BaseLayout>
        <View className="p-4 flex space-y-2">
          <Title />
          <View className="space-y-4">
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
          <View className="space-y-2">
            <Button variant="link" onPress={goToResetPassword}>
              <Button.Text>Forgot password ?</Button.Text>
            </Button>
            <Text className="text-center dark:text-white">
              By using the app, you agree to stocklytics's Terms & Conditions
              and Privacy Policy
            </Text>
          </View>
          <Button onPress={handleSubmit(onSubmit)} disabled={disableSubmit}>
            {isLoading && <LoadingIcon name="loader" />}
            <Button.Text>Continue</Button.Text>
          </Button>
          <View className="flex flex-row justify-center space-x-1">
            <Text className="dark:text-white">New here ?</Text>
            <Button variant="link" onPress={goToRegister}>
              <Button.Text>Create an account</Button.Text>
            </Button>
          </View>
        </View>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}

const Title = () => {
  return (
    <View className="flex items-center">
      <Text className="text-2xl font-bold dark:text-white">Welcome back !</Text>
      <Text className="text-xl text-neutral-400">Login to your account</Text>
    </View>
  );
};
