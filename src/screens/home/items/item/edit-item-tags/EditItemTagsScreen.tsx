import { KeyboardAvoidingView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ItemsStackScreenProps } from '../../../../../navigation/ItemsNavigation';
import CloseKeyboardOnTouch from '../../../../../components/CloseKeyboardOnTouch';
import BaseLayout from '../../../../../components/layouts/BaseLayout';
import Button from '../../../../../components/buttons/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { createEditItemTagsViewModel } from './edit-item-tags.viewmodel';
import TagsInput from '../../../../../components/inputs/tags-input/TagsInput';
import { useEffect } from 'react';
import { InferType } from 'yup';
import { isRejected } from '@reduxjs/toolkit';

const formSchema = yup.object({
  tagIds: yup.array().of(yup.string().required()).required(),
});

type FormValues = InferType<typeof formSchema>;

export default function EditItemTagsScreen({
  navigation,
  route: {
    params: { itemId },
  },
}: ItemsStackScreenProps<'EditItemTags'>) {
  const { t } = useTranslation('home');
  const dispatch = useDispatch();
  const { tags, setTags } = useSelector(
    createEditItemTagsViewModel({ itemId, dispatch }),
  );
  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      tagIds: [],
    },
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    setValue('tagIds', tags);
  }, [tags, setValue]);

  const onSubmit = (form: FormValues) => {
    const action = setTags(form.tagIds);
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
            <View className="space-y-4 flex-1">
              <View className="space-y-2">
                <Text className="text-2xl dark:text-white font-bold">
                  {t('edit.item.tags.title')}
                </Text>
                <Text className="text-neutral-500 dark:text-neutral-400">
                  {t('edit.item.tags.subTitle')}
                </Text>
              </View>
              <View className="flex-1">
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TagsInput
                      tagIds={field.value}
                      onChange={field.onChange}
                      autoFocus
                    />
                  )}
                  name="tagIds"
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
