import {
  createTagsFixture,
  TagsFixture,
} from '../../../__tests__/tags.fixture';
import { tagBuilder } from '../../../__tests__/tag.builder';

describe('Feature: create tag', () => {
  let fixture: TagsFixture;

  beforeEach(() => {
    fixture = createTagsFixture();
  });

  test('Tag is created', async () => {
    await fixture.whenCreateTag({
      id: 'tag-id',
      name: 'Tag name',
    });

    fixture.thenTagIsCreated({
      id: 'tag-id',
      name: 'Tag name',
    });

    fixture.thenTagsShouldBe([
      tagBuilder().withId('tag-id').withName('Tag name').build(),
    ]);
  });
});
