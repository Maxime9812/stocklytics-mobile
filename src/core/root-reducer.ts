import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { itemsSlice } from './items/items.slice';
import { foldersSlice } from './folders/folders.slice';
import { tagsSlice } from './tags/tags.slice';
import { scannerSlice } from './scanner/scanner.slice';
import { permissionsSlice } from './permissions/permissions.slice';

export const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [itemsSlice.name]: itemsSlice.reducer,
  [foldersSlice.name]: foldersSlice.reducer,
  [tagsSlice.name]: tagsSlice.reducer,
  [scannerSlice.name]: scannerSlice.reducer,
  [permissionsSlice.name]: permissionsSlice.reducer,
});
