import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../../core/create-store';
import {
  selectItemById,
  selectItemIsLoading,
} from '../../../../../core/items/items.slice';

type ScanItemFoundViewModelParams = {
  id: string;
};

type ScanItemFoundViewModelStateLoading = { type: 'loading' };
export type ScanItemFoundViewModelStateLoaded = {
  type: 'loaded';
  item: {
    name: string;
  };
};

export type ScanItemFoundViewModelState =
  | ScanItemFoundViewModelStateLoading
  | ScanItemFoundViewModelStateLoaded;

export const createScanItemFoundViewModel = ({
  id,
}: ScanItemFoundViewModelParams): ((
  state: RootState,
) => ScanItemFoundViewModelState) =>
  createSelector(
    [selectItemById(id), selectItemIsLoading(id)],
    (item, isLoading) => {
      if (isLoading || !item) {
        return { type: 'loading' };
      }
      return { type: 'loaded', item: { name: item.name } };
    },
  );
