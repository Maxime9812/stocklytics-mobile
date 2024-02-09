import { BarcodeType } from '../models/barcode';

export interface BarcodeTypeProvider {
  getBarcodeType(barcode: string): BarcodeType;
}
