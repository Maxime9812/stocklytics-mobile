import { createSelector, createSlice } from '@reduxjs/toolkit';
import { tagsAdapter, TagsEntityState } from './hexagon/models/tag.model';
import { getItemsInFolderUseCase } from '../items/hexagon/usecases/get-items-in-folder/get-items-in-folder.usecase';
import { RootState } from '../create-store';
import { getAllTagsUseCase } from './hexagon/usecases/get-all-tags/get-all-tags.usecase';
import { createTagUseCase } from './hexagon/usecases/create-tag/create-tag.usecase';

export type TagSliceState = TagsEntityState;

const initialState: TagSliceState = tagsAdapter.getInitialState();

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItemsInFolderUseCase.fulfilled, (state, action) => {
        tagsAdapter.upsertMany(
          state,
          action.payload.flatMap((item) => item.tags),
        );
      })
      .addCase(getAllTagsUseCase.fulfilled, (state, action) => {
        tagsAdapter.upsertMany(state, action.payload);
      })
      .addCase(createTagUseCase.fulfilled, (state, action) => {
        tagsAdapter.addOne(state, action.payload);
      });
  },
});

export const tagsSelectors = tagsAdapter.getSelectors<RootState>(
  (state) => state.tags,
);

export const selectAllTags = tagsSelectors.selectAll;

export const selectTags = createSelector(
  [tagsSelectors.selectAll],
  (tags) => (ids: string[]) => tags.filter((tag) => ids.includes(tag.id)),
);
