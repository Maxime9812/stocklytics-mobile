import { TestStore } from '../../create-store';
import { Tag } from '../hexagon/models/tag.model';
import { stateBuilder } from '../../state-builder';

export const createTagsFixture = () => {
  let store: TestStore;
  return {
    thenTagsShouldBe: (tags: Tag[]) => {
      expect(store.getState()).toEqual(stateBuilder().withTags(tags).build());
    },
  };
};

export type TagsFixture = ReturnType<typeof createTagsFixture>;
