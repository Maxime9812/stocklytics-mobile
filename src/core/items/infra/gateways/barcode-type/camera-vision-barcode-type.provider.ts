import { BarcodeTypeProvider } from '../../../hexagon/gateways/barcode-type.provider';
import { BarcodeType } from '../../../hexagon/models/barcode';

export class CameraVisionBarcodeTypeProvider implements BarcodeTypeProvider {
  getBarcodeType(barcode: string): BarcodeType | 'unsupported' {
    switch (barcode) {
      case 'ean-13':
        return 'ean13';
      default:
        return 'unsupported';
    }
  }
}
