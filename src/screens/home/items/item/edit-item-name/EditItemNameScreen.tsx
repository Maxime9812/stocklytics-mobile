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

const formSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

type FormValues = InferType<typeof formSchema>;

export default function EditItemNameScreen({
  route: {
    params: { name, itemId },
  },
}: ItemsStackScreenProps<'EditItemName'>) {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name,
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <CloseKeyboardOnTouch>
      <BaseLayout variant="secondary">
        <KeyboardAvoidingView
          className="flex-1"
          behavior="padding"
          keyboardVerticalOffset={50}
        >
          <View className="p-4 justify-between space-y-2 flex-1">
            <View className="space-y-4">
              <View className="space-y-2">
                <Text className="text-2xl dark:text-white font-bold">Name</Text>
                <Text className="text-neutral-500 dark:text-neutral-400">
                  Edit item's name
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
                      placeholder="Item name"
                    />
                  )}
                  name="name"
                />
              </View>
            </View>
            <Button onPress={handleSubmit(onSubmit)}>
              <Button.Text>Save</Button.Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}
