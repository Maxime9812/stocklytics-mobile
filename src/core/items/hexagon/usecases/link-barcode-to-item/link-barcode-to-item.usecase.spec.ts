import {
  createItemsFixture,
  ItemsFixture,
} from '../../../__tests__/items.fixture';
import { itemBuilder } from '../../../__tests__/item.builder';

describe('Feature: Link Barcode to Item', () => {
  let fixture: ItemsFixture;

  beforeEach(() => {
    fixture = createItemsFixture();
  });

  test('Link barcode to item', async () => {
    const initialItemBuilder = itemBuilder().withId('item-id').withoutBarcode();
    fixture.givenExistingItems([initialItemBuilder.build()]);

    const action = fixture.whenLinkBarcode({
      itemId: 'item-id',
      barcode: {
        type: 'ean13',
        value: '1234567890123',
      },
    });

    fixture.thenStateIs((initialState) =>
      initialState.withLinkingBarcodeToItem('item-id'),
    );

    await action;

    fixture.thenLinkBarcodeIsSend({
      itemId: 'item-id',
      barcode: {
        type: 'ean13',
        value: '1234567890123',
      },
    });

    fixture.thenStateIs((initialState) =>
      initialState.withItems([
        initialItemBuilder
          .withBarcode({
            type: 'ean13',
            value: '1234567890123',
          })
          .build(),
      ]),
    );
  });

  test('Another item is already linked to the barcode', async () => {
    const initialItemBuilder = itemBuilder().withId('item-id').withoutBarcode();
    fixture.givenExistingItems([initialItemBuilder.build()]);
    fixture.givenLinkBarcodeError({
      type: 'BarcodeAlreadyLinkedToAnotherItemError',
      itemId: 'another-item-id',
    });

    await fixture.whenLinkBarcode({
      itemId: 'item-id',
      barcode: {
        type: 'ean13',
        value: '1234567890123',
      },
    });

    fixture.thenStateIs((initialState) =>
      initialState.withLinkBarcodeToItemError({
        itemId: 'item-id',
        error: {
          type: 'BarcodeAlreadyLinkedToAnotherItemError',
          itemId: 'another-item-id',
        },
      }),
    );
  });

  test('Remove error when link barcode to item', async () => {
    fixture.givenInitialState((initialState) =>
      initialState.withLinkBarcodeToItemError({
        itemId: 'item-id',
        error: {
          type: 'BarcodeAlreadyLinkedToAnotherItemError',
          itemId: 'another-item-id',
        },
      }),
    );

    fixture.whenLinkBarcode({
      itemId: 'item-id',
      barcode: {
        type: 'ean13',
        value: '1234567890123',
      },
    });

    fixture.thenStateIs((initialState) =>
      initialState
        .withoutLinkBarcodeToItemError('item-id')
        .withLinkingBarcodeToItem('item-id'),
    );
  });
});
