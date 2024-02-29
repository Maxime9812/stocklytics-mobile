import BaseLayout from '../../../../../components/layouts/BaseLayout';
import CloseKeyboardOnTouch from '../../../../../components/CloseKeyboardOnTouch';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import BaseTextInput from '../../../../../components/inputs/BaseTextInput';
import Button from '../../../../../components/buttons/Button';
import * as yup from 'yup';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ItemsStackScreenProps } from '../../../../../navigation/ItemsNavigation';
import { useAppDispatch } from '../../../../../store-hooks';
import { useSelector } from 'react-redux';
import { createEditItemNameScreenViewModel } from './edit-item-name-screen.viewmodel';
import { isRejected } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

const formSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

type FormValues = InferType<typeof formSchema>;

export default function EditItemNameScreen({
  navigation,
  route: {
    params: { itemId },
  },
}: ItemsStackScreenProps<'EditItemName'>) {
  const { t } = useTranslation('home');
  const dispatch = useAppDispatch();
  const { name, editName } = useSelector(
    createEditItemNameScreenViewModel({ itemId, dispatch }),
  );
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name,
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    const action = await editName(values.name);
    if (isRejected(action)) return;
    navigation.goBack();
  };

  return (
    <CloseKeyboardOnTouch>
      <BaseLayout variant="secondary">
        <KeyboardAvoidingView
          className="flex-1"
          behavior="padding"
          keyboardVerticalOffset={50}
        >
          <View className="p-4 pt-0 justify-between space-y-2 flex-1">
            <View className="space-y-4">
              <View className="space-y-2">
                <Text className="text-2xl dark:text-white font-bold">
                  {t('edit.item.name.title')}
                </Text>
                <Text className="text-neutral-500 dark:text-neutral-400">
                  {t('edit.item.name.subTitle')}
                </Text>
              </View>
              <View>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <BaseTextInput
                      {...field}
                      autoFocus
                      onChangeText={field.onChange}
                      placeholder={t('edit.item.name.form.name.placeholder')}
                    />
                  )}
                  name="name"
                />
              </View>
            </View>
            <Button onPress={handleSubmit(onSubmit)}>
              <Button.Text>{t('edit.item.name.form.submit')}</Button.Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}
