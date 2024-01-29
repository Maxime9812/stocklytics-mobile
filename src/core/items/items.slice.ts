import { createSlice } from '@reduxjs/toolkit';
import { itemsAdapter, ItemsEntityState } from './hexagon/models/item.model';

export type ItemsSliceState = ItemsEntityState;

export const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsAdapter.getInitialState() as ItemsSliceState,
  reducers: {},
});
