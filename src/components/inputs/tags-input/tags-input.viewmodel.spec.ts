import { createTagsInputViewModel } from './tags-input.viewmodel';
import { stateBuilder } from '../../../core/state-builder';
import { tagBuilder } from '../../../core/tags/__tests__/tag.builder';
import { createTestStore, EMPTY_ARGS } from '../../../core/create-store';
import { getAllTagsUseCase } from '../../../core/tags/hexagon/usecases/get-all-tags/get-all-tags.usecase';
import { createTagUseCase } from '../../../core/tags/hexagon/usecases/create-tag/create-tag.usecase';
import { DeterministicUUIDProvider } from '../../../core/common/uuid-provider/deterministic-uuid.provider';

describe('TagsInputViewModel', () => {
  it('Should call getAllTagsUseCase when call loadTags', () => {
    const store = createTestStore();

    const { loadTags } = createTagsInputViewModel({
      tagIds: [],
      onChange: jest.fn(),
      setSearch: jest.fn(),
      dispatch: store.dispatch,
      uuidProvider: new DeterministicUUIDProvider(),
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
      setSearch: jest.fn(),
      dispatch: jest.fn(),
      uuidProvider: new DeterministicUUIDProvider(),
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
      setSearch: jest.fn(),
      dispatch: jest.fn(),
      uuidProvider: new DeterministicUUIDProvider(),
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
        setSearch: jest.fn(),
        dispatch: jest.fn(),
        uuidProvider: new DeterministicUUIDProvider(),
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
        setSearch: jest.fn(),
        dispatch: jest.fn(),
        uuidProvider: new DeterministicUUIDProvider(),
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
        setSearch: jest.fn(),
        dispatch: jest.fn(),
        uuidProvider: new DeterministicUUIDProvider(),
      })(state);

      availableTags[0].add();

      expect(tagIds).toEqual(['tag-id', 'tag-id-2']);
    });

    it('Should return availableTagsIsEmpty true when no available tags', () => {
      const state = stateBuilder().build();

      const { availableTagsIsEmpty } = createTagsInputViewModel({
        tagIds: [],
        setSearch: jest.fn(),
        onChange: jest.fn(),
        dispatch: jest.fn(),
        uuidProvider: new DeterministicUUIDProvider(),
      })(state);

      expect(availableTagsIsEmpty).toEqual(true);
    });

    it('Should return availableTagsIsEmpty true when no available tags', () => {
      const state = stateBuilder().withTags([tagBuilder().build()]).build();

      const { availableTagsIsEmpty } = createTagsInputViewModel({
        tagIds: [],
        setSearch: jest.fn(),
        onChange: jest.fn(),
        dispatch: jest.fn(),
        uuidProvider: new DeterministicUUIDProvider(),
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
          setSearch: jest.fn(),
          onChange: jest.fn(),
          dispatch: jest.fn(),
          uuidProvider: new DeterministicUUIDProvider(),
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
          setSearch: jest.fn(),
          onChange: jest.fn(),
          dispatch: jest.fn(),
          uuidProvider: new DeterministicUUIDProvider(),
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
        setSearch: jest.fn(),
        onChange: jest.fn(),
        dispatch: jest.fn(),
        uuidProvider: new DeterministicUUIDProvider(),
      })(state);

      expect(canAddNewTag).toEqual(true);
    });

    it('Should return canAddNewTag false when search is empty', () => {
      const state = stateBuilder().build();

      const { canAddNewTag } = createTagsInputViewModel({
        search: '',
        tagIds: [],
        setSearch: jest.fn(),
        onChange: jest.fn(),
        dispatch: jest.fn(),
        uuidProvider: new DeterministicUUIDProvider(),
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
        setSearch: jest.fn(),
        onChange: jest.fn(),
        dispatch: jest.fn(),
        uuidProvider: new DeterministicUUIDProvider(),
      })(state);

      expect(canAddNewTag).toEqual(false);
    });

    it('Should call createTagUseCase when addNewTag', async () => {
      const store = createTestStore();
      const uuidProvider = new DeterministicUUIDProvider();
      uuidProvider.givenUUID('tag-id');

      const { addNewTag } = createTagsInputViewModel({
        tagIds: [],
        onChange: jest.fn(),
        setSearch: jest.fn(),
        search: 'Phone',
        dispatch: store.dispatch,
        uuidProvider,
      })(store.getState());

      await addNewTag();

      expect(store.getDispatchedUseCaseArgs(createTagUseCase)).toEqual({
        id: 'tag-id',
        name: 'Phone',
      });
    });

    it('Should add new tag when created', async () => {
      const state = stateBuilder().build();
      const store = createTestStore();
      const uuidProvider = new DeterministicUUIDProvider();
      uuidProvider.givenUUID('tag-id-2');

      let tagIds = ['tag-id'];

      const onChange = (newTagIds: string[]) => {
        tagIds = newTagIds;
      };

      const { addNewTag } = createTagsInputViewModel({
        tagIds,
        onChange,
        setSearch: jest.fn(),
        search: 'Phone',
        dispatch: store.dispatch,
        uuidProvider,
      })(state);

      await addNewTag();

      expect(tagIds).toEqual(['tag-id', 'tag-id-2']);
    });

    it('Should clear search when add new tag', async () => {
      const state = stateBuilder().build();
      const store = createTestStore();
      const uuidProvider = new DeterministicUUIDProvider();
      uuidProvider.givenUUID('tag-id-2');

      let search = 'Phone';

      const setSearch = (newSearch: string) => {
        search = newSearch;
      };

      const { addNewTag } = createTagsInputViewModel({
        tagIds: [],
        onChange: jest.fn(),
        setSearch,
        search,
        dispatch: store.dispatch,
        uuidProvider,
      })(state);

      await addNewTag();

      expect(search).toEqual('');
    });
  });
});
