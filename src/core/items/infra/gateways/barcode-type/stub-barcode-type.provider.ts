import { BarcodeTypeProvider } from '../../../hexagon/gateways/barcode-type.provider';
import { BarcodeType } from '../../../../scanner/hexagon/models/barcode';

export class StubBarcodeTypeProvider implements BarcodeTypeProvider {
  private barcodeType: Map<string, BarcodeType | 'unsupported'> = new Map();
  getBarcodeType(barcode: string): BarcodeType | 'unsupported' {
    return this.barcodeType.get(barcode)!;
  }

  givenBarcodeType(barcode: string, type: BarcodeType | 'unsupported') {
    this.barcodeType.set(barcode, type);
  }
}
