import { useAppDispatch } from '../../../../../store-hooks';
import { ItemsStackScreenProps } from '../../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../../components/layouts/BaseLayout';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import CloseKeyboardOnTouch from '../../../../../components/CloseKeyboardOnTouch';
import Button from '../../../../../components/buttons/Button';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AdjustInput from './components/adjust-input/AdjustInput';
import { useSelector } from 'react-redux';
import { createEditQuantityViewModel } from './edit-quantity.viewmodel';
import { isRejected } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import Card from '../../../../../components/cards/Card';

const formSchema = yup
  .object({
    quantity: yup.number().notOneOf([0]).required(),
  })
  .required();

type FormValues = yup.InferType<typeof formSchema>;

export default function EditQuantityScreen({
  navigation,
  route: {
    params: { itemId },
  },
}: ItemsStackScreenProps<'EditItemQuantity'>) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('home');
  const [quantityToAdjust, setQuantityToAdjust] = useState<number | undefined>(
    undefined,
  );
  const { handleSubmit, control, formState, watch } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });
  const { adjustedQuantity, adjust, currentQuantity, itemName } = useSelector(
    createEditQuantityViewModel({
      itemId,
      dispatch,
      quantityToAdjust,
    }),
  );

  const canSubmit = formState.isValid;

  watch((value) => {
    setQuantityToAdjust(value.quantity);
  });
  const onSave = async (formValues: FormValues) => {
    const action = await adjust(formValues.quantity);
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
                  {t('edit.item.quantity.title')}
                </Text>
                <Text className="text-neutral-500 dark:text-neutral-400">
                  {t('edit.item.quantity.subTitle')}
                  <Text className="dark:text-white">{itemName}</Text>
                </Text>
              </View>
              <Card type="secondary" className="p-3">
                <Card.Header className="justify-between">
                  <Text className="text-neutral-500 dark:text-neutral-400">
                    {t('edit.item.quantity.currentQuantity')}
                  </Text>
                </Card.Header>
                <Text className="dark:text-white">{currentQuantity}</Text>
              </Card>
              <View>
                <Controller
                  render={({ field }) => (
                    <AdjustInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                  name="quantity"
                  control={control}
                />
              </View>
              <Card type="secondary" className="p-3">
                <Card.Header className="justify-between">
                  <Text className="text-neutral-500 dark:text-neutral-400">
                    {t('edit.item.quantity.newQuantity')}
                  </Text>
                </Card.Header>
                <Text className="dark:text-white">{adjustedQuantity}</Text>
              </Card>
            </View>

            <Button onPress={handleSubmit(onSave)} disabled={!canSubmit}>
              <Button.Text>{t('edit.item.quantity.form.submit')}</Button.Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}
