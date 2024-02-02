import { Text, TouchableOpacity, View } from 'react-native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../components/layouts/BaseLayout';
import { Controller, useForm } from 'react-hook-form';
import BaseTextInput from '../../../../components/inputs/BaseTextInput';
import * as yup from 'yup';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseKeyboardOnTouch from '../../../../components/CloseKeyboardOnTouch';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../../store-hooks';
import { isRejected } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { createCreateItemScreenViewModel } from './create-item-screen.viewmodel';

const createItemFormSchema = yup
  .object({
    name: yup.string().required(),
    quantity: yup.number().min(0).required(),
  })
  .required();

type CreateItemFormValues = InferType<typeof createItemFormSchema>;

export default function CreateItemScreen({
  navigation,
  route: {
    params: { folderId },
  },
}: ItemsStackScreenProps<'CreateItem'>) {
  const dispatch = useAppDispatch();
  const viewModel = useSelector(
    createCreateItemScreenViewModel({ folderId, dispatch }),
  );
  const { control, handleSubmit, formState, setFocus } =
    useForm<CreateItemFormValues>({
      defaultValues: {
        name: '',
        quantity: 1,
      },
      resolver: yupResolver(createItemFormSchema),
    });

  const isLoading = formState.isSubmitting;
  const disableSubmit = !formState.isValid || isLoading;

  const onSubmit = async (values: CreateItemFormValues) => {
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
          <TouchableOpacity
            className={`bg-red-400 py-4 rounded-full flex-row justify-center items-center space-x-1 ${disableSubmit && 'opacity-50'}`}
            onPress={handleSubmit(onSubmit)}
            disabled={disableSubmit}
          >
            <Text className="text-white">Add</Text>
          </TouchableOpacity>
        </View>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}
