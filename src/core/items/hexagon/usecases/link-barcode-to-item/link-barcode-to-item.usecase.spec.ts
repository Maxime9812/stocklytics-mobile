import {
  createItemsFixture,
  ItemsFixture,
} from '../../../__tests__/items.fixture';
import { itemBuilder } from '../../../__tests__/item.builder';
import { isRejected } from '@reduxjs/toolkit';

describe('Feature: Link Barcode to Item', () => {
  let fixture: ItemsFixture;

  beforeEach(() => {
    fixture = createItemsFixture();
  });

  test('Link barcode to item', async () => {
    const initialItemBuilder = itemBuilder().withId('item-id').withoutBarcode();
    fixture.givenExistingItems([initialItemBuilder.build()]);
    fixture.givenBarcodeTypeSupported('ean13', 'ean13');

    await fixture.whenLinkBarcode({
      itemId: 'item-id',
      barcode: {
        type: 'ean13',
        value: '1234567890123',
      },
    });

    fixture.thenLinkBarcodeIsSend({
      itemId: 'item-id',
      barcode: {
        type: 'ean13',
        value: '1234567890123',
      },
    });

    fixture.thenItemsIs([
      {
        ...initialItemBuilder
          .withBarcode({
            type: 'ean13',
            value: '1234567890123',
          })
          .build(),
        tags: [],
      },
    ]);
  });

  describe('Scenario: Barcode type is not supported', () => {
    test('Do not link barcode to item', async () => {
      fixture.givenBarcodeTypeUnsupported('unsupported-type');
      const action = await fixture.whenLinkBarcode({
        itemId: 'item-id',
        barcode: {
          type: 'unsupported-type',
          value: '1234567890123',
        },
      });

      expect(isRejected(action)).toEqual(true);
    });
  });
});
