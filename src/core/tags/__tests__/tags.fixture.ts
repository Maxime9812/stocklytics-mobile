import { createTestStore, TestStore } from '../../create-store';
import { Tag } from '../hexagon/models/tag.model';
import { stateBuilder } from '../../state-builder';
import { getAllTagsUseCase } from '../hexagon/usecases/get-all-tags/get-all-tags.usecase';
import { StubTagsGateway } from '../infra/gateways/stub-tags.gateway';
import {
  createTagUseCase,
  CreateTagUseCasePayload,
} from '../hexagon/usecases/create-tag/create-tag.usecase';
import { CreateTagPayload } from '../hexagon/gateways/tags.gateway';

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
    whenCreateTag: async (payload: CreateTagUseCasePayload) => {
      store = createTestStore({ tagsGateway });
      await store.dispatch(createTagUseCase(payload));
    },
    thenTagIsCreated: (payload: CreateTagPayload) => {
      expect(tagsGateway.lastCreatedTag).toEqual(payload);
    },
    thenTagsShouldBe: (tags: Tag[]) => {
      expect(store.getState()).toEqual(stateBuilder().withTags(tags).build());
    },
  };
};

export type TagsFixture = ReturnType<typeof createTagsFixture>;
