import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { Barcode } from '../../../scanner/hexagon/models/barcode';

export type ItemModel = {
  id: string;
  name: string;
  quantity: number;
  note: string;
  tags: string[];
  folderId: string | null;
  barcode?: Barcode;
  image?: string;
  createdAt: string;
};

export const itemsAdapter = createEntityAdapter<ItemModel>();

export type ItemsEntityState = EntityState<ItemModel, string>;
