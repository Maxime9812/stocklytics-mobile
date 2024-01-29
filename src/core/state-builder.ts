import { rootReducer } from './root-reducer';
import {
  ActionCreatorWithPayload,
  createAction,
  createReducer,
} from '@reduxjs/toolkit';
import { AuthUser } from './auth/hexagon/models/auth-user';
import { ItemModel, itemsAdapter } from './items/hexagon/models/item.model';
import {
  folderAdapter,
  FolderModel,
} from './folders/hexagon/models/folder.model';

const initialState = rootReducer(undefined, createAction('')());

const withAuthUser = createAction<AuthUser | undefined>('withAuthUser');

const withItems = createAction<ItemModel[]>('withItems');
const withItemLoading = createAction<string[]>('withLoadingItem');
const withItemNotLoading = createAction<string[]>('withNotLoadingItem');
const withLoadingFoldersItems = createAction<string[]>(
  'withLoadingFoldersItems',
);
const withNotLoadingFoldersItems = createAction<string[]>(
  'withNotLoadingFoldersItems',
);

const withFolders = createAction<FolderModel[]>('withFolders');
const withFolderInFolderLoading = createAction<string | undefined>(
  'withFolderInFolderLoading',
);
const withFolderInFolderNotLoading = createAction<string | undefined>(
  'withFolderInFolderNotLoading',
);

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(withAuthUser, (state, action) => {
      state.auth.authUser = action.payload;
      state.auth.hasCheckedAuthState = true;
    })
    .addCase(withItems, (state, action) => {
      itemsAdapter.addMany(state.items, action.payload);
    })
    .addCase(withItemLoading, (state, action) => {
      action.payload.forEach((id) => {
        state.items.isLoadingById[id] = true;
      });
    })
    .addCase(withItemNotLoading, (state, action) => {
      action.payload.forEach((id) => {
        state.items.isLoadingById[id] = false;
      });
    })
    .addCase(withLoadingFoldersItems, (state, action) => {
      action.payload.forEach((id) => {
        state.items.isLoadingFoldersItemsById[id] = true;
      });
    })
    .addCase(withNotLoadingFoldersItems, (state, action) => {
      action.payload.forEach((id) => {
        state.items.isLoadingFoldersItemsById[id] = false;
      });
    })
    .addCase(withFolders, (state, action) => {
      folderAdapter.addMany(state.folders, action.payload);
    })
    .addCase(withFolderInFolderLoading, (state, action) => {
      state.folders.foldersInFolderLoading[action.payload ?? 'root'] = true;
    })
    .addCase(withFolderInFolderNotLoading, (state, action) => {
      state.folders.foldersInFolderLoading[action.payload ?? 'root'] = false;
    });
});

export const stateBuilder = (baseState = initialState) => {
  const reduce =
    <T>(actionCreator: ActionCreatorWithPayload<T>) =>
    (payload: T) =>
      stateBuilder(reducer(baseState, actionCreator(payload)));

  return {
    withAuthUser: reduce(withAuthUser),
    withItems: reduce(withItems),
    withLoadingItem: reduce(withItemLoading),
    withNotLoadingItem: reduce(withItemNotLoading),
    withLoadingFoldersItems: reduce(withLoadingFoldersItems),
    withNotLoadingFoldersItems: reduce(withNotLoadingFoldersItems),
    withFolders: reduce(withFolders),
    withFolderInFolderLoading: reduce(withFolderInFolderLoading),
    withFolderInFolderNotLoading: reduce(withFolderInFolderNotLoading),
    build: () => baseState,
  };
};
