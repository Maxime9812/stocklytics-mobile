import { ScannerGateway } from '../../hexagon/gateways/scannerGateway';
import { Barcode } from '../../hexagon/models/barcode';
import { Scan } from '../../hexagon/models/Scan';
import { AxiosInstance } from 'axios';

export class AxiosScannerGateway implements ScannerGateway {
  constructor(private readonly axios: AxiosInstance) {}

  async scan(barcode: Barcode): Promise<Scan | undefined> {
    try {
      const response = await this.axios.get<Scan | undefined>('/scan', {
        params: barcode,
      });

      return response.data;
    } catch (e) {
      return {
        type: 'not-found',
      };
    }
  }
}
