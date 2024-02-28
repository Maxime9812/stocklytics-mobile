import { Text, View } from 'react-native';
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
import Button from '../../../components/buttons/Button';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('auth');
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
        <View className="p-4 pt-0 h-screen space-y-2">
          <Title />
          <View className="space-y-4">
            <View>
              <InputLabel>{t('register.form.fullName')}</InputLabel>
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
              <InputLabel>{t('register.form.email')}</InputLabel>
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
              <InputLabel>{t('register.form.password')}</InputLabel>
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
            {t('register.termsAndConditions')}
          </Text>
          <Button onPress={handleSubmit(onSubmit)} disabled={disableSubmit}>
            <Button.Text>{t('register.createAccount')}</Button.Text>
          </Button>
          <View className="flex flex-row justify-center space-x-1">
            <Text className="dark:text-white">
              {t('register.alreadyHaveAccount')}
            </Text>
            <Button variant="link" onPress={goToLogin}>
              <Button.Text>{t('register.signIn')}</Button.Text>
            </Button>
          </View>
        </View>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}

const Title = () => {
  const { t } = useTranslation('auth');

  return (
    <View className="space-y-2">
      <Text className="text-3xl font-bold dark:text-white">
        {t('register.title')}
      </Text>
      <Text className="text-neutral-500 dark:text-neutral-400">
        {t('register.subTitle')}
      </Text>
    </View>
  );
};
