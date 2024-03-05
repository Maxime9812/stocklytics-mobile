import { createEditItemTagsViewModel } from './edit-item-tags.viewmodel';
import { stateBuilder } from '../../../../../core/state-builder';
import { itemBuilder } from '../../../../../core/items/__tests__/item.builder';

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
});
