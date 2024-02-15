import { createScannerViewModel } from './scanner.viewmodel';
import { Barcode } from '../../../core/scanner/hexagon/models/barcode';

describe('ScannerViewModel', () => {
  it('Should call OnScan when scan is called', () => {
    let barcode: Barcode | undefined;
    const onScan = (_barcode: Barcode) => {
      barcode = _barcode;
    };
    const { scan } = createScannerViewModel({
      interval: 100,
      onScan,
      setLastScannedAt: jest.fn(),
      getNow: () => new Date('2024-01-01T00:00:00.000Z'),
    });

    scan({
      type: 'code128',
      value: '123',
    });

    expect(barcode).toEqual({
      type: 'code128',
      value: '123',
    });
  });

  it('Should call OnScan when last scan was after interval', () => {
    let barcode: Barcode | undefined;
    const onScan = (_barcode: Barcode) => {
      barcode = _barcode;
    };
    const { scan } = createScannerViewModel({
      interval: 500,
      onScan,
      lastScannedAt: new Date('2024-01-01T00:00:00.000Z'),
      setLastScannedAt: jest.fn(),
      getNow: () => new Date('2024-01-01T00:00:01.000Z'),
    });

    scan({
      type: 'code128',
      value: '123',
    });

    expect(barcode).toEqual({
      type: 'code128',
      value: '123',
    });
  });

  it('Should NOT call OnScan when last scan was before interval', () => {
    let barcode: Barcode | undefined;
    const onScan = (_barcode: Barcode) => {
      barcode = _barcode;
    };
    const { scan } = createScannerViewModel({
      interval: 500,
      onScan,
      lastScannedAt: new Date('2024-01-01T00:00:00.000Z'),
      setLastScannedAt: jest.fn(),
      getNow: () => new Date('2024-01-01T00:00:00.400Z'),
    });

    scan({
      type: 'code128',
      value: '123',
    });

    expect(barcode).toBeUndefined();
  });

  it('Should NOT call OnScan when last scan was at exactly now plus interval', () => {
    let barcode: Barcode | undefined;
    const onScan = (_barcode: Barcode) => {
      barcode = _barcode;
    };
    const { scan } = createScannerViewModel({
      interval: 500,
      onScan,
      lastScannedAt: new Date('2024-01-01T00:00:00.000Z'),
      setLastScannedAt: jest.fn(),
      getNow: () => new Date('2024-01-01T00:00:00.500Z'),
    });

    scan({
      type: 'code128',
      value: '123',
    });

    expect(barcode).toBeUndefined();
  });

  it('Should call setLastScan when scan is called', () => {
    const currentDate = new Date('2024-01-01T00:00:00.200Z');
    let lastScannedAt = new Date('2024-01-01T00:00:00.000Z');

    const setLastScan = (date: Date) => {
      lastScannedAt = date;
    };
    const { scan } = createScannerViewModel({
      interval: 100,
      onScan: jest.fn(),
      lastScannedAt,
      setLastScannedAt: setLastScan,
      getNow: () => currentDate,
    });

    scan({
      type: 'code128',
      value: '123',
    });

    expect(lastScannedAt).toEqual(currentDate);
  });
});
