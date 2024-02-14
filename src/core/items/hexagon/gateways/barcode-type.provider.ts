import { BarcodeType } from '../../../scanner/hexagon/models/barcode';

export interface BarcodeTypeProvider {
  getBarcodeType(barcode: string): BarcodeType | 'unsupported';
}
