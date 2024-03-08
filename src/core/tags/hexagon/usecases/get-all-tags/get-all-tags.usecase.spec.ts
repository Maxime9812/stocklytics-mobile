import {
  createTagsFixture,
  TagsFixture,
} from '../../../__tests__/tags.fixture';
import { tagBuilder } from '../../../__tests__/tag.builder';

describe('Feature: Get all tags', () => {
  let fixture: TagsFixture;

  beforeEach(() => {
    fixture = createTagsFixture();
  });

  it('Should return tags', async () => {
    fixture.givenExistingTags([
      tagBuilder().withId('tag-id').withName('Tag name').build(),
    ]);

    await fixture.whenGetAllTags();

    fixture.thenTagsShouldBe([
      tagBuilder().withId('tag-id').withName('Tag name').build(),
    ]);
  });
});
