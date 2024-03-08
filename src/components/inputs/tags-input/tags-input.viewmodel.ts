import { createSelector, isRejected } from '@reduxjs/toolkit';
import { selectAllTags, selectTags } from '../../../core/tags/tags.slice';
import { AppDispatch } from '../../../core/create-store';
import { getAllTagsUseCase } from '../../../core/tags/hexagon/usecases/get-all-tags/get-all-tags.usecase';
import { UUIDProvider } from '../../../core/common/uuid-provider/UUIDProvider';
import { createTagUseCase } from '../../../core/tags/hexagon/usecases/create-tag/create-tag.usecase';

type TagsInputViewModelParams = {
  search?: string;
  setSearch: (search: string) => void;
  tagIds: string[];
  onChange(tags: string[]): void;
  dispatch: AppDispatch;
  uuidProvider: UUIDProvider;
};

export const createTagsInputViewModel = ({
  tagIds,
  onChange,
  dispatch,
  search = '',
  uuidProvider,
  setSearch,
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

    const addNewTag = async () => {
      setSearch('');
      const id = uuidProvider.generate();
      const action = await dispatch(createTagUseCase({ id, name: search }));
      if (isRejected(action)) {
        return;
      }
      onChange([...tagIds, id]);
    };

    return {
      tags,
      loadTags,
      availableTags,
      availableTagsIsEmpty,
      canAddNewTag,
      addNewTag,
    };
  });
