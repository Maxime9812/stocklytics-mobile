import { Text, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InferType } from 'yup';
import { useEffect } from 'react';
import CloseKeyboardOnTouch from '../../../components/CloseKeyboardOnTouch';
import BaseLayout from '../../../components/layouts/BaseLayout';
import { AuthStackScreenProps } from '../../../navigation/AuthStackNavigation';
import BaseTextInput from '../../../components/inputs/BaseTextInput';

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
        <View className="p-4 flex h-screen space-y-2">
          <Text className="text-3xl font-bold dark:text-white">
            Reset Password
          </Text>
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
          <TouchableOpacity
            className={`bg-red-400 py-4 rounded-full ${disableSubmit && 'opacity-50'}`}
            onPress={handleSubmit(onSubmit)}
            disabled={disableSubmit}
          >
            <Text className="text-white text-center">Send Link</Text>
          </TouchableOpacity>
        </View>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}
