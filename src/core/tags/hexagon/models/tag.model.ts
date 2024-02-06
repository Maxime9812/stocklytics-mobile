import { createEntityAdapter } from '@reduxjs/toolkit';

export type Tag = {
  id: string;
  name: string;
};

export const tagsAdapter = createEntityAdapter<Tag>();

export type TagsEntityState = ReturnType<typeof tagsAdapter.getInitialState>;
