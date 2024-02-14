import {
  createScannerFixture,
  ScannerFixture,
} from '../../../__tests__/scanner.fixture';
import { Barcode } from '../../models/barcode';
import { Scan } from '../../models/Scan';

describe('Feature: Scan barcode', () => {
  let fixture: ScannerFixture;

  beforeEach(() => {
    fixture = createScannerFixture();
  });

  test('Item is linked', async () => {
    const barcode: Barcode = {
      type: 'ean13',
      value: 'barcode-value',
    };
    const scan: Scan = {
      type: 'item',
      id: 'item-id',
    };

    await fixture.givenReceivingScan(barcode, scan);

    const action = fixture.whenScanBarcode(barcode);

    fixture.thenScannerShouldBeLoading();

    await action;

    fixture.thenScanShouldBe(scan);
  });

  test('Nothing is linked', async () => {
    await fixture.whenScanBarcode({
      type: 'ean13',
      value: 'barcode-value',
    });
    fixture.thenScanShouldBeUndefined();
  });
});
