import { createTagsInputViewModel } from './tags-input.viewmodel';
import { stateBuilder } from '../../../core/state-builder';
import { tagBuilder } from '../../../core/tags/__tests__/tag.builder';
import { createTestStore, EMPTY_ARGS } from '../../../core/create-store';
import { getAllTagsUseCase } from '../../../core/tags/hexagon/usecases/get-all-tags/get-all-tags.usecase';

describe('TagsInputViewModel', () => {
  it('Should call getAllTagsUseCase when call loadTags', () => {
    const store = createTestStore();

    const { loadTags } = createTagsInputViewModel({
      tagIds: [],
      onChange: jest.fn(),
      dispatch: store.dispatch,
    })(store.getState());

    loadTags();

    expect(store.getDispatchedUseCaseArgs(getAllTagsUseCase)).toEqual(
      EMPTY_ARGS,
    );
  });
  it('Should return tags', () => {
    const state = stateBuilder()
      .withTags([
        tagBuilder().withId('tag-id').withName('Phone').build(),
        tagBuilder().withId('tag-id-2').withName('Apple').build(),
      ])
      .build();

    const { tags } = createTagsInputViewModel({
      tagIds: ['tag-id', 'tag-id-2'],
      onChange: jest.fn(),
      dispatch: jest.fn(),
    })(state);

    expect(tags).toEqual([
      expect.objectContaining({ id: 'tag-id', name: 'Phone' }),
      expect.objectContaining({ id: 'tag-id-2', name: 'Apple' }),
    ]);
  });

  it('Should remove tag', () => {
    const state = stateBuilder()
      .withTags([
        tagBuilder().withId('tag-id').withName('Phone').build(),
        tagBuilder().withId('tag-id-2').withName('Apple').build(),
      ])
      .build();

    let tagIds = ['tag-id', 'tag-id-2'];

    const onChange = (newTagIds: string[]) => {
      tagIds = newTagIds;
    };

    const { tags } = createTagsInputViewModel({
      tagIds,
      onChange,
      dispatch: jest.fn(),
    })(state);

    tags[0].delete();
  });

  describe('Available tags', () => {
    it('Should return all when no tagIds', () => {
      const state = stateBuilder()
        .withTags([
          tagBuilder().withId('tag-id').withName('Phone').build(),
          tagBuilder().withId('tag-id-2').withName('Apple').build(),
        ])
        .build();

      const { availableTags } = createTagsInputViewModel({
        tagIds: [],
        onChange: jest.fn(),
        dispatch: jest.fn(),
      })(state);

      expect(availableTags).toEqual([
        expect.objectContaining({ id: 'tag-id', name: 'Phone' }),
        expect.objectContaining({ id: 'tag-id-2', name: 'Apple' }),
      ]);
    });
    it('Should not include already selected tags', () => {
      const state = stateBuilder()
        .withTags([
          tagBuilder().withId('tag-id').withName('Phone').build(),
          tagBuilder().withId('tag-id-2').withName('Apple').build(),
        ])
        .build();

      const { availableTags } = createTagsInputViewModel({
        tagIds: ['tag-id'],
        onChange: jest.fn(),
        dispatch: jest.fn(),
      })(state);

      expect(availableTags).toEqual([
        expect.objectContaining({ id: 'tag-id-2', name: 'Apple' }),
      ]);
    });
    it('Should add tag when call add', () => {
      const state = stateBuilder()
        .withTags([
          tagBuilder().withId('tag-id').withName('Phone').build(),
          tagBuilder().withId('tag-id-2').withName('Apple').build(),
        ])
        .build();

      let tagIds = ['tag-id'];

      const onChange = (newTagIds: string[]) => {
        tagIds = newTagIds;
      };

      const { availableTags } = createTagsInputViewModel({
        tagIds,
        onChange,
        dispatch: jest.fn(),
      })(state);

      availableTags[0].add();

      expect(tagIds).toEqual(['tag-id', 'tag-id-2']);
    });

    it('Should return availableTagsIsEmpty true when no available tags', () => {
      const state = stateBuilder().build();

      const { availableTagsIsEmpty } = createTagsInputViewModel({
        tagIds: [],
        onChange: jest.fn(),
        dispatch: jest.fn(),
      })(state);

      expect(availableTagsIsEmpty).toEqual(true);
    });

    it('Should return availableTagsIsEmpty true when no available tags', () => {
      const state = stateBuilder().withTags([tagBuilder().build()]).build();

      const { availableTagsIsEmpty } = createTagsInputViewModel({
        tagIds: [],
        onChange: jest.fn(),
        dispatch: jest.fn(),
      })(state);

      expect(availableTagsIsEmpty).toEqual(false);
    });

    describe('Search', () => {
      it('Should search tags that includes the search term', () => {
        const state = stateBuilder()
          .withTags([
            tagBuilder().withId('tag-id').withName('Phone').build(),
            tagBuilder().withId('tag-id-2').withName('Apple').build(),
          ])
          .build();

        const { availableTags } = createTagsInputViewModel({
          search: 'Pho',
          tagIds: [],
          onChange: jest.fn(),
          dispatch: jest.fn(),
        })(state);

        expect(availableTags).toEqual([
          expect.objectContaining({ id: 'tag-id', name: 'Phone' }),
        ]);
      });
      it('Should be case insensitive', () => {
        const state = stateBuilder()
          .withTags([
            tagBuilder().withId('tag-id').withName('Phone').build(),
            tagBuilder().withId('tag-id-2').withName('Apple').build(),
          ])
          .build();

        const { availableTags } = createTagsInputViewModel({
          search: 'pho',
          tagIds: [],
          onChange: jest.fn(),
          dispatch: jest.fn(),
        })(state);

        expect(availableTags).toEqual([
          expect.objectContaining({ id: 'tag-id', name: 'Phone' }),
        ]);
      });
    });
  });

  describe('Add new tag', () => {
    it('Should return canAddNewTag when search is not empty and no tag is available', () => {
      const state = stateBuilder().build();

      const { canAddNewTag } = createTagsInputViewModel({
        search: 'Phone',
        tagIds: [],
        onChange: jest.fn(),
        dispatch: jest.fn(),
      })(state);

      expect(canAddNewTag).toEqual(true);
    });

    it('Should return canAddNewTag false when search is empty', () => {
      const state = stateBuilder().build();

      const { canAddNewTag } = createTagsInputViewModel({
        search: '',
        tagIds: [],
        onChange: jest.fn(),
        dispatch: jest.fn(),
      })(state);

      expect(canAddNewTag).toEqual(false);
    });

    it('Should return canAddNewTag false when search is not empty and tag is available', () => {
      const state = stateBuilder()
        .withTags([tagBuilder().withName('Phone').build()])
        .build();

      const { canAddNewTag } = createTagsInputViewModel({
        search: 'Pho',
        tagIds: [],
        onChange: jest.fn(),
        dispatch: jest.fn(),
      })(state);

      expect(canAddNewTag).toEqual(false);
    });
  });
});
