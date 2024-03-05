import BaseTextInput from '../BaseTextInput';
import {
  TextInput,
  TouchableWithoutFeedback,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { createTagsInputViewModel } from './tags-input.viewmodel';
import Badge from '../../badge/Badge';
import { Feather } from '@expo/vector-icons';
import { useAppDispatch } from '../../../store-hooks';
import { useEffect, useState } from 'react';
import Card from '../../cards/Card';
import Button from '../../buttons/Button';
import { useTranslation } from 'react-i18next';

type Props = {
  tagIds: string[];
  onChange(tags: string[]): void;
} & TextInput['props'];

export default function TagsInput({ tagIds, onChange, ...inputProps }: Props) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const { tags, loadTags, availableTags, availableTagsIsEmpty, canAddNewTag } =
    useSelector(
      createTagsInputViewModel({ tagIds, onChange, dispatch, search }),
    );

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <View className="space-y-2 flex-1">
      <View>
        <View className="flex-row flex-wrap gap-2">
          {tags.map((tag) => (
            <View key={tag.id}>
              <TouchableWithoutFeedback onPress={tag.delete}>
                <Badge size="lg">
                  {tag.name} <Feather name="x" />
                </Badge>
              </TouchableWithoutFeedback>
            </View>
          ))}
        </View>
      </View>
      <BaseTextInput
        {...inputProps}
        value={search}
        onChangeText={setSearch}
        placeholder={t('inputTags.search.placeholder')}
      />
      <Card type="secondary" className="flex-1">
        {canAddNewTag && (
          <Button variant="ghost" type="secondary" onPress={() => {}}>
            <Button.Text>
              {t('inputTags.createAndAdd')}
              <Text className="font-bold">{search}</Text>
            </Button.Text>
          </Button>
        )}
        {availableTagsIsEmpty && (
          <View className="h-full">
            <Text className="text-neutral-500 dark:text-neutral-400 m-auto">
              {t('inputTags.emptyTags')}
            </Text>
          </View>
        )}
        <ScrollView>
          {!availableTagsIsEmpty &&
            availableTags.map((tag) => (
              <Button
                key={tag.id}
                variant="ghost"
                type="secondary"
                onPress={tag.add}
              >
                <Button.Text>{tag.name}</Button.Text>
              </Button>
            ))}
        </ScrollView>
      </Card>
    </View>
  );
}
