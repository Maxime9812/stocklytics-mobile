import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export type FolderModel = {
  id: string;
  name: string;
  createdAt: string;
  parentId?: string;
  itemQuantity: number;
};

export const folderAdapter = createEntityAdapter<FolderModel>();

export type FolderEntityState = EntityState<FolderModel, string>;
