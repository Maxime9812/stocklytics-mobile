import { createEditItemTagsViewModel } from './edit-item-tags.viewmodel';
import { stateBuilder } from '../../../../../core/state-builder';
import { itemBuilder } from '../../../../../core/items/__tests__/item.builder';
import { createTestStore } from '../../../../../core/create-store';
import { setItemTagsUseCase } from '../../../../../core/items/hexagon/usecases/set-item-tags/set-item-tags.usecase';

describe('EditItemTagsViewModel', () => {
  it('Should return item tags', () => {
    const state = stateBuilder()
      .withItems([
        itemBuilder()
          .withId('item-id')
          .withTags(['tag-id', 'tag-id-2'])
          .build(),
      ])
      .withTags([
        { id: 'tag-id', name: 'Phone' },
        { id: 'tag-id-2', name: 'Apple' },
      ])
      .build();

    const { tags } = createEditItemTagsViewModel({
      itemId: 'item-id',
      dispatch: jest.fn(),
    })(state);

    expect(tags).toEqual(['tag-id', 'tag-id-2']);
  });

  it('Should call SetItemTagsUseCase when call setTags', async () => {
    const store = createTestStore();

    const { setTags } = createEditItemTagsViewModel({
      itemId: 'item-id',
      dispatch: store.dispatch,
    })(store.getState());

    await setTags(['tag-id', 'tag-id-2']);

    expect(store.getDispatchedUseCaseArgs(setItemTagsUseCase)).toEqual({
      itemId: 'item-id',
      tagIds: ['tag-id', 'tag-id-2'],
    });
  });
});
