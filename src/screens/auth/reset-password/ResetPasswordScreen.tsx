import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthStackScreenProps } from '../../../navigation/NavigationProvider';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InferType } from 'yup';
import { useEffect } from 'react';
import CloseKeyboardOnTouch from '../../../components/CloseKeyboardOnTouch';

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
    <SafeAreaView className="bg-white">
      <StatusBar style="auto" />
      <CloseKeyboardOnTouch>
        <View className="p-4 flex h-screen space-y-2">
          <Text className="text-2xl font-bold text-center">Stocklytics</Text>
          <Text className="text-xl font-bold">Reset Password</Text>
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
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
              name="email"
            />
          </View>
          <TouchableOpacity
            className={`bg-red-400 py-4 rounded ${disableSubmit && 'opacity-50'}`}
            onPress={handleSubmit(onSubmit)}
            disabled={disableSubmit}
          >
            <Text className="text-white text-center">Send Link</Text>
          </TouchableOpacity>
        </View>
      </CloseKeyboardOnTouch>
    </SafeAreaView>
  );
}
