import { KeyboardAvoidingView, Text, View } from 'react-native';
import { ItemsStackScreenProps } from '../../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../../components/layouts/BaseLayout';
import { Controller, useForm } from 'react-hook-form';
import BaseTextInput from '../../../../../components/inputs/BaseTextInput';
import * as yup from 'yup';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseKeyboardOnTouch from '../../../../../components/CloseKeyboardOnTouch';
import { useAppDispatch } from '../../../../../store-hooks';
import { isRejected } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { createAddItemScreenViewModel } from './add-item-screen.viewmodel';
import Button from '../../../../../components/buttons/Button';
import { useTranslation } from 'react-i18next';

const addItemFormSchema = yup
  .object({
    name: yup.string().required(),
    quantity: yup.number().min(0).required(),
  })
  .required();

type AddItemFormValues = InferType<typeof addItemFormSchema>;

export default function AddItemScreen({
  navigation,
  route: {
    params: { folderId },
  },
}: ItemsStackScreenProps<'AddItem'>) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('home');
  const viewModel = useSelector(
    createAddItemScreenViewModel({ folderId, dispatch }),
  );
  const { control, handleSubmit, formState, setFocus } =
    useForm<AddItemFormValues>({
      defaultValues: {
        name: '',
        quantity: 1,
      },
      resolver: yupResolver(addItemFormSchema),
    });

  const isLoading = formState.isSubmitting;
  const disableSubmit = !formState.isValid || isLoading;

  const onSubmit = async (values: AddItemFormValues) => {
    const action = await viewModel.addItem(values);
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
                  {t('add.item.title')}
                </Text>
                <Text className="text-neutral-500 dark:text-neutral-400">
                  {t('add.item.subTitle')}
                  <Text className="text-black dark:text-white">
                    {viewModel.folderName}
                  </Text>
                </Text>
              </View>
              <View>
                <Text className="dark:text-white mb-2">
                  {t('add.item.form.name.label')}
                </Text>
                <Controller
                  render={({ field }) => (
                    <BaseTextInput
                      {...field}
                      autoFocus
                      placeholder={t('add.item.form.name.placeholder')}
                      onChangeText={field.onChange}
                      returnKeyType="next"
                      onSubmitEditing={() => setFocus('quantity')}
                    />
                  )}
                  name="name"
                  control={control}
                />
              </View>
              <View>
                <Text className="dark:text-white mb-2">
                  {t('add.item.form.quantity')}
                </Text>
                <Controller
                  render={({ field }) => (
                    <BaseTextInput
                      {...field}
                      onChangeText={field.onChange}
                      value={field.value.toString()}
                      keyboardType="numeric"
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                  )}
                  name="quantity"
                  control={control}
                />
              </View>
            </View>
            <Button onPress={handleSubmit(onSubmit)} disabled={disableSubmit}>
              <Button.Text>{t('add.item.form.submit')}</Button.Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}
