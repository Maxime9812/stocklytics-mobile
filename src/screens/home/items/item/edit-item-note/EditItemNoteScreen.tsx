import { KeyboardAvoidingView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { createEditItemNoteScreenViewModel } from './edit-item-note-screen.viewmodel';
import { isRejected } from '@reduxjs/toolkit';
import { ItemsStackScreenProps } from '../../../../../navigation/ItemsNavigation';
import { useAppDispatch } from '../../../../../store-hooks';
import CloseKeyboardOnTouch from '../../../../../components/CloseKeyboardOnTouch';
import BaseLayout from '../../../../../components/layouts/BaseLayout';
import BaseTextInput from '../../../../../components/inputs/BaseTextInput';
import Button from '../../../../../components/buttons/Button';

const formSchema = yup
  .object({
    note: yup.string().max(300).default(''),
  })
  .required();

type FormValues = InferType<typeof formSchema>;
export default function EditItemNoteScreen({
  navigation,
  route: {
    params: { note, itemId },
  },
}: ItemsStackScreenProps<'EditItemNote'>) {
  const dispatch = useAppDispatch();
  const { editNote } = createEditItemNoteScreenViewModel({ itemId, dispatch });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      note,
    },
    resolver: yupResolver(formSchema),
  });

  const onSaveNote = async (values: FormValues) => {
    const action = await editNote(values.note);
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
                <Text className="text-2xl dark:text-white font-bold">Note</Text>
                <Text className="text-neutral-500 dark:text-neutral-400">
                  Edit item's note
                </Text>
              </View>
              <View>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <BaseTextInput
                      {...field}
                      autoFocus
                      maxLength={300}
                      multiline
                      onChangeText={field.onChange}
                      placeholder="Add a note"
                      style={{ maxHeight: 160 }}
                    />
                  )}
                  name="note"
                />
              </View>
            </View>
            <Button onPress={handleSubmit(onSaveNote)}>
              <Button.Text>Save</Button.Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </BaseLayout>
    </CloseKeyboardOnTouch>
  );
}
