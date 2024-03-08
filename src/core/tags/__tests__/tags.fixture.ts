import { createTestStore, TestStore } from '../../create-store';
import { Tag } from '../hexagon/models/tag.model';
import { stateBuilder } from '../../state-builder';
import { getAllTagsUseCase } from '../hexagon/usecases/get-all-tags/get-all-tags.usecase';
import { StubTagsGateway } from '../infra/gateways/stub-tags.gateway';

export const createTagsFixture = () => {
  let store: TestStore;
  const tagsGateway = new StubTagsGateway();

  return {
    givenExistingTags: (tags: Tag[]) => {
      tagsGateway.givenTags(tags);
    },
    whenGetAllTags: async () => {
      store = createTestStore({ tagsGateway });
      await store.dispatch(getAllTagsUseCase());
    },
    thenTagsShouldBe: (tags: Tag[]) => {
      expect(store.getState()).toEqual(stateBuilder().withTags(tags).build());
    },
  };
};

export type TagsFixture = ReturnType<typeof createTagsFixture>;
