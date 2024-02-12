import {
  createItemsFixture,
  ItemsFixture,
} from '../../../__tests__/items.fixture';
import { itemBuilder } from '../../../__tests__/item.builder';

describe('Feature: Unlink item barcode', () => {
  let fixture: ItemsFixture;

  beforeEach(() => {
    fixture = createItemsFixture();
  });

  test('Item barcode is unlinked', async () => {
    const initialItemBuilder = itemBuilder().withId('item-id').withBarcode({
      type: 'ean13',
      value: 'barcode-value',
    });
    fixture.givenExistingItems([initialItemBuilder.build()]);

    await fixture.whenUnlinkBarcode('item-id');

    fixture.thenUnlinkBarcodeIsRequestedFor('item-id');

    fixture.thenItemsIs([
      { ...initialItemBuilder.withoutBarcode().build(), tags: [] },
    ]);
  });
});
