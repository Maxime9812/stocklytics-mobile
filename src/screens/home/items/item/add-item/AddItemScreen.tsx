import { Text, View } from 'react-native';
import { ItemsStackScreenProps } from '../../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../../components/layouts/BaseLayout';
import { Controller, useForm } from 'react-hook-form';
import BaseTextInput from '../../../../../components/inputs/BaseTextInput';
import * as yup from 'yup';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseKeyboardOnTouch from '../../../../../components/CloseKeyboardOnTouch';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../../../store-hooks';
import { isRejected } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { createAddItemScreenViewModel } from './add-item-screen.viewmodel';
import Button from '../../../../../components/buttons/Button';

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
            Add item to {viewModel.folderName}
          </Text>
          <View>
            <Text className="dark:text-white mb-2">Name</Text>
            <Controller
              render={({ field }) => (
                <BaseTextInput
                  {...field}
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
            <Text className="dark:text-white mb-2">Quantity</Text>
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
          <Button onPress={handleSubmit(onSubmit)} disabled={disableSubmit}>
            <Button.Text>Add</Button.Text>
          </Button>
        </View>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}
