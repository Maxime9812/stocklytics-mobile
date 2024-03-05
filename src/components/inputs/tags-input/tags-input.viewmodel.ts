import { createSelector } from '@reduxjs/toolkit';
import { selectAllTags, selectTags } from '../../../core/tags/tags.slice';
import { AppDispatch } from '../../../core/create-store';
import { getAllTagsUseCase } from '../../../core/tags/hexagon/usecases/get-all-tags/get-all-tags.usecase';

type TagsInputViewModelParams = {
  search?: string;
  tagIds: string[];
  onChange(tags: string[]): void;
  dispatch: AppDispatch;
};

export const createTagsInputViewModel = ({
  tagIds,
  onChange,
  dispatch,
  search = '',
}: TagsInputViewModelParams) =>
  createSelector([selectTags, selectAllTags], (selectTags, allTags) => {
    const loadTags = () => {
      return dispatch(getAllTagsUseCase());
    };

    const tags = selectTags(tagIds).map((tag) => {
      const deleteTag = () => {
        tagIds = tagIds.filter((id) => id !== tag.id);
        onChange(tagIds);
      };

      return {
        ...tag,
        delete: deleteTag,
      };
    });

    const availableTags = allTags
      .filter((tag) => !tagIds.includes(tag.id))
      .filter((tag) => tag.name.toLowerCase().includes(search.toLowerCase()))
      .map((tag) => {
        const add = () => {
          onChange([...tagIds, tag.id]);
        };

        return {
          ...tag,
          add,
        };
      });

    const availableTagsIsEmpty = availableTags.length === 0;

    const canAddNewTag = search.length > 0 && availableTagsIsEmpty;

    return {
      tags,
      loadTags,
      availableTags,
      availableTagsIsEmpty,
      canAddNewTag,
    };
  });
