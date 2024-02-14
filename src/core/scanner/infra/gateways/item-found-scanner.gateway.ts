import { ScannerGateway } from '../../hexagon/gateways/scannerGateway';
import { Scan } from '../../hexagon/models/Scan';

export class ItemFoundScannerGateway implements ScannerGateway {
  constructor(
    private readonly id: string,
    private readonly delay = 0,
  ) {}
  async scan(): Promise<Scan | undefined> {
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    return { type: 'item', id: this.id };
  }
}
