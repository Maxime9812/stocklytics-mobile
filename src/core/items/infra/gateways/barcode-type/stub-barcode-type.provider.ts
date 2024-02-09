import { BarcodeTypeProvider } from '../../../hexagon/gateways/barcode-type.provider';
import { BarcodeType } from '../../../hexagon/models/barcode';

export class StubBarcodeTypeProvider implements BarcodeTypeProvider {
  private barcodeType: Map<string, BarcodeType> = new Map();
  getBarcodeType(barcode: string): BarcodeType {
    return this.barcodeType.get(barcode)!;
  }

  givenBarcodeType(barcode: string, type: BarcodeType) {
    this.barcodeType.set(barcode, type);
  }
}
