import { Barcode } from '../models/barcode';
import { Scan } from '../models/Scan';

export interface ScannerGateway {
  scan(barcode: Barcode): Promise<Scan | undefined>;
}
