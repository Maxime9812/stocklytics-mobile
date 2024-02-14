import axios from 'axios';
import { AxiosScannerGateway } from './axios-scanner.gateway';
import nock from 'nock';

const BASE_URL = 'http://localhost';

describe('AxiosItemsGateway', () => {
  let axiosScannerGateway: AxiosScannerGateway;

  beforeEach(() => {
    axiosScannerGateway = new AxiosScannerGateway(
      axios.create({ baseURL: BASE_URL }),
    );
  });

  describe('scan', () => {
    it('Should return scan result', async () => {
      nock(BASE_URL)
        .get('/scan')
        .query({ type: 'ean13', value: 'barcode-value' })
        .reply(200, {
          type: 'item',
          id: 'item-id',
        });
      const scan = await axiosScannerGateway.scan({
        type: 'ean13',
        value: 'barcode-value',
      });
      expect(scan).toEqual({
        type: 'item',
        id: 'item-id',
      });
    });
    it('Should return not found', async () => {
      nock(BASE_URL)
        .get('/scan')
        .query({ type: 'ean13', value: 'barcode-value' })
        .reply(404);
      const scan = await axiosScannerGateway.scan({
        type: 'ean13',
        value: 'barcode-value',
      });
      expect(scan).toEqual({
        type: 'not-found',
      });
    });
  });
});
