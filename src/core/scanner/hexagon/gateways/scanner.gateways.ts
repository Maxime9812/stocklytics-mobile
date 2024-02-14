import { Barcode } from '../models/barcode';
import { Scan } from '../models/Scan';

export interface ScannerGateways {
  scan(barcode: Barcode): Promise<Scan | undefined>;
}
