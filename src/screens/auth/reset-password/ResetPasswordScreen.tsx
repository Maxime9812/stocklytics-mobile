import { KeyboardAvoidingView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InferType } from 'yup';
import { useEffect } from 'react';
import CloseKeyboardOnTouch from '../../../components/CloseKeyboardOnTouch';
import BaseLayout from '../../../components/layouts/BaseLayout';
import { AuthStackScreenProps } from '../../../navigation/AuthStackNavigation';
import BaseTextInput from '../../../components/inputs/BaseTextInput';
import Button from '../../../components/buttons/Button';

const resetPasswordFormSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

type ResetPasswordFormValues = InferType<typeof resetPasswordFormSchema>;

export default function ResetPasswordScreen({
  navigation,
  route: { params: defaultValues },
}: AuthStackScreenProps<'ResetPassword'>) {
  const { control, handleSubmit, formState, setFocus } =
    useForm<ResetPasswordFormValues>({
      defaultValues,
      resolver: yupResolver(resetPasswordFormSchema),
    });

  const onSubmit = (data: ResetPasswordFormValues) => {
    console.log(data);
  };

  const disableSubmit = !formState.isValid;

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
    <CloseKeyboardOnTouch>
      <BaseLayout>
        <KeyboardAvoidingView className="flex-1" behavior="padding">
          <View className="p-4 pt-0 flex-1 justify-between h-screen space-y-2">
            <View className="space-y-4">
              <Title />
              <View>
                <Text className="mb-2 font-medium dark:text-white">Email</Text>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <BaseTextInput
                      {...field}
                      onChangeText={field.onChange}
                      autoCapitalize="none"
                      placeholder="john.doe@gmail.com"
                      textContentType="emailAddress"
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                  )}
                  name="email"
                />
              </View>
            </View>
            <Button onPress={handleSubmit(onSubmit)} disabled={disableSubmit}>
              <Button.Text>Send Link</Button.Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}

const Title = () => (
  <View className="space-y-2">
    <Text className="text-3xl font-bold dark:text-white">Reset Password</Text>
    <Text className="text-neutral-500 dark:text-neutral-400">
      Enter your email to receive a password reset link
    </Text>
  </View>
);
