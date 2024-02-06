import { createSlice } from '@reduxjs/toolkit';
import { tagsAdapter, TagsEntityState } from './hexagon/models/tag.model';
import { getItemsInFolderUseCase } from '../items/hexagon/usecases/get-items-in-folder/get-items-in-folder.usecase';

export type TagSliceState = TagsEntityState;

const initialState: TagSliceState = tagsAdapter.getInitialState();

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItemsInFolderUseCase.fulfilled, (state, action) => {
      tagsAdapter.upsertMany(
        state,
        action.payload.flatMap((item) => item.tags),
      );
    });
  },
});
