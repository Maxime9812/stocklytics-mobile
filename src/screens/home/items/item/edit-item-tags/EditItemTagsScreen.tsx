import { KeyboardAvoidingView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ItemsStackScreenProps } from '../../../../../navigation/ItemsNavigation';
import CloseKeyboardOnTouch from '../../../../../components/CloseKeyboardOnTouch';
import BaseLayout from '../../../../../components/layouts/BaseLayout';
import BaseTextInput from '../../../../../components/inputs/BaseTextInput';
import Button from '../../../../../components/buttons/Button';
import { useTranslation } from 'react-i18next';

const formSchema = yup.object({
  search: yup.string(),
});

export default function EditItemTagsScreen({
  route: {
    params: { itemId },
  },
}: ItemsStackScreenProps<'EditItemTags'>) {
  const { t } = useTranslation('home');
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
                <Text className="text-2xl dark:text-white font-bold">
                  {t('edit.item.tags.title')}
                </Text>
                <Text className="text-neutral-500 dark:text-neutral-400">
                  {t('edit.item.tags.subTitle')}
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
                      placeholder={t('edit.item.tags.form.tags.placeholder')}
                    />
                  )}
                  name="search"
                />
              </View>
            </View>
            <Button onPress={handleSubmit(onSubmit)}>
              <Button.Text>{t('edit.item.tags.form.submit')}</Button.Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}
