import { KeyboardAvoidingView, Text, View } from 'react-native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../components/layouts/BaseLayout';
import CloseKeyboardOnTouch from '../../../../components/CloseKeyboardOnTouch';
import { Controller, useForm } from 'react-hook-form';
import BaseTextInput from '../../../../components/inputs/BaseTextInput';
import { isRejected } from '@reduxjs/toolkit';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../../../store-hooks';
import { useSelector } from 'react-redux';
import { InferType } from 'yup';
import * as yup from 'yup';
import { createAddFolderScreenViewModel } from './add-folder-screen.viewmodel';
import Button from '../../../../components/buttons/Button';
import { useTranslation } from 'react-i18next';

const addFolderFormSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

type CreateItemFormValues = InferType<typeof addFolderFormSchema>;
export default function AddFolderScreen({
  navigation,
  route: {
    params: { parentId },
  },
}: ItemsStackScreenProps<'AddFolder'>) {
  const { t } = useTranslation('home');
  const dispatch = useAppDispatch();
  const viewModel = useSelector(
    createAddFolderScreenViewModel({ parentId, dispatch }),
  );

  const { control, handleSubmit, formState } = useForm<CreateItemFormValues>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(addFolderFormSchema),
  });

  const isLoading = formState.isSubmitting;
  const disableSubmit = !formState.isValid || isLoading;

  const onSubmit = async (values: CreateItemFormValues) => {
    const action = await viewModel.addFolder(values);
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
                  {t('add.folder.title')}
                </Text>
                <Text className="text-neutral-500 dark:text-neutral-400">
                  {t('add.folder.subTitle')}
                  <Text className="text-black dark:text-white">
                    {viewModel.folderName}
                  </Text>
                </Text>
              </View>
              <View>
                <Text className="dark:text-white mb-2">
                  {t('add.folder.form.name.label')}
                </Text>
                <Controller
                  render={({ field }) => (
                    <BaseTextInput
                      {...field}
                      autoFocus
                      placeholder={t('add.folder.form.name.placeholder')}
                      onChangeText={field.onChange}
                      value={field.value.toString()}
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                  )}
                  name="name"
                  control={control}
                />
              </View>
            </View>
            <Button onPress={handleSubmit(onSubmit)} disabled={disableSubmit}>
              <Button.Text>{t('add.folder.form.submit')}</Button.Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}
