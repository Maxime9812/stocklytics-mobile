import { Tag } from '../hexagon/models/tag.model';

export const tagBuilder = (model: Tag = { id: 'tag-id', name: 'Tag' }) => {
  return {
    withId: (id: string) => tagBuilder({ ...model, id }),
    withName: (name: string) => tagBuilder({ ...model, name }),
    build: () => model,
  };
};
