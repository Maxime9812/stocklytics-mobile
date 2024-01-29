import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { itemsSlice } from './items/items.slice';
import { foldersSlice } from './folders/folders.slice';

export const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [itemsSlice.name]: itemsSlice.reducer,
  [foldersSlice.name]: foldersSlice.reducer,
});
