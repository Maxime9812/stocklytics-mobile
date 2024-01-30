import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export type ItemModel = {
  id: string;
  name: string;
  quantity: number;
  description: string;
  folderId: string | null;
  createdAt: string;
};

export const itemsAdapter = createEntityAdapter<ItemModel>();

export type ItemsEntityState = EntityState<ItemModel, string>;
