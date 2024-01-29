import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export type ItemModel = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
};

export const itemsAdapter = createEntityAdapter<ItemModel>();

export type ItemsEntityState = EntityState<ItemModel, string>;
