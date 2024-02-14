import { ScannerGateway } from '../../hexagon/gateways/scannerGateway';
import { Scan } from '../../hexagon/models/Scan';

export class NotFoundScannerGateway implements ScannerGateway {
  async scan(): Promise<Scan | undefined> {
    return { type: 'not-found' };
  }
}
