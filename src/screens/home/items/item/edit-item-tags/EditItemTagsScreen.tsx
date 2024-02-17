import { KeyboardAvoidingView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ItemsStackScreenProps } from '../../../../../navigation/ItemsNavigation';
import CloseKeyboardOnTouch from '../../../../../components/CloseKeyboardOnTouch';
import BaseLayout from '../../../../../components/layouts/BaseLayout';
import BaseTextInput from '../../../../../components/inputs/BaseTextInput';
import Button from '../../../../../components/buttons/Button';

const formSchema = yup.object({
  search: yup.string(),
});

export default function EditItemTagsScreen({
  route: {
    params: { itemId },
  },
}: ItemsStackScreenProps<'EditItemTags'>) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: '',
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = () => {};

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
                <Text className="text-2xl dark:text-white font-bold">Tags</Text>
                <Text className="text-neutral-500 dark:text-neutral-400">
                  Edit item's tags
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
                      placeholder="Add a tag"
                    />
                  )}
                  name="search"
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
