import { Text, View } from 'react-native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../components/layouts/BaseLayout';
import CloseKeyboardOnTouch from '../../../../components/CloseKeyboardOnTouch';
import { Controller, useForm } from 'react-hook-form';
import BaseTextInput from '../../../../components/inputs/BaseTextInput';
import { useEffect } from 'react';
import { isRejected } from '@reduxjs/toolkit';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../../../store-hooks';
import { useSelector } from 'react-redux';
import { InferType } from 'yup';
import * as yup from 'yup';
import { createAddFolderScreenViewModel } from './add-folder-screen.viewmodel';
import Button from '../../../../components/buttons/Button';

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
  const dispatch = useAppDispatch();
  const viewModel = useSelector(
    createAddFolderScreenViewModel({ parentId, dispatch }),
  );

  const { control, handleSubmit, formState, setFocus } =
    useForm<CreateItemFormValues>({
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

  const focusOnTransitionEnd = () => {
    return navigation.addListener('transitionEnd', (e) => {
      if (e.data.closing) return;
      setFocus('name');
    });
  };

  useEffect(() => {
    return focusOnTransitionEnd();
  }, []);

  return (
    <CloseKeyboardOnTouch>
      <BaseLayout>
        <View className="p-2 space-y-2">
          <Text className="dark:text-white text-2xl">
            Add folder to {viewModel.folderName}
          </Text>
          <View>
            <Text className="dark:text-white mb-2">Name</Text>
            <Controller
              render={({ field }) => (
                <BaseTextInput
                  {...field}
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
          <Button onPress={handleSubmit(onSubmit)} disabled={disableSubmit}>
            <Button.Text>Add</Button.Text>
          </Button>
        </View>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}
