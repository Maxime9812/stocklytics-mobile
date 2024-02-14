import { ScannerGateway } from '../../hexagon/gateways/scannerGateway';
import { Barcode } from '../../hexagon/models/barcode';
import { Scan } from '../../hexagon/models/Scan';

export class StubScannerGateway implements ScannerGateway {
  private scans: Map<string, Scan> = new Map();
  async scan(barcode: Barcode): Promise<Scan | undefined> {
    return this.scans.get(this.getScanKey(barcode));
  }

  givenReceivingScanFor(barcode: Barcode, scan: Scan) {
    this.scans.set(this.getScanKey(barcode), scan);
  }

  private getScanKey(barcode: Barcode) {
    return `${barcode.type}-${barcode.value}`;
  }
}
