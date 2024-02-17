import { createSelector } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../../../../core/create-store';
import { Barcode } from '../../../../../core/scanner/hexagon/models/barcode';
import { selectItemById } from '../../../../../core/items/items.slice';
import { selectTags } from '../../../../../core/tags/tags.slice';
import { unlinkItemBarcodeUseCase } from '../../../../../core/items/hexagon/usecases/unlink-item-barcode/unlink-item-barcode.usecase';

export type CreateItemDetailScreenViewModelParams = {
  itemId: string;
  locale?: string;
  dispatch: AppDispatch;
};

export type ItemDetailScreenViewModelLoading = {
  type: 'loading';
};

export type ItemDetailScreenViewModelLoaded = {
  type: 'loaded';
  item: {
    id: string;
    name: string;
    note: string;
    tags: {
      id: string;
      name: string;
    }[];
    quantity: number;
    createdAt: string;
    hasNote: boolean;
    barcode?: Barcode;
    unlinkBarcode: () => Promise<void>;
  };
};

export type ItemDetailScreenViewModelState =
  | ItemDetailScreenViewModelLoading
  | ItemDetailScreenViewModelLoaded;
export const createItemDetailScreenViewModel = ({
  itemId,
  locale,
  dispatch,
}: CreateItemDetailScreenViewModelParams): ((
  state: RootState,
) => ItemDetailScreenViewModelState) =>
  createSelector([selectItemById(itemId), selectTags], (item, selectTags) => {
    if (!item) {
      return {
        type: 'loading',
      };
    }

    const unlinkBarcode = async () => {
      await dispatch(unlinkItemBarcodeUseCase(itemId));
    };

    const dateFormatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    return {
      type: 'loaded',
      item: {
        id: item.id,
        name: item.name,
        note: item.note,
        tags: selectTags(item.tags).map((tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        quantity: item.quantity,
        createdAt: dateFormatter.format(new Date(item.createdAt)),
        hasNote: !!item.note,
        barcode: item.barcode,
        unlinkBarcode,
      },
    };
  });
