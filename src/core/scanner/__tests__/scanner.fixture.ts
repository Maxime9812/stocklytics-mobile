import { Scan } from '../hexagon/models/Scan';
import { createTestStore, TestStore } from '../../create-store';
import { stateBuilder } from '../../state-builder';
import { StubScannerGateway } from '../infra/gateways/stub-scanner.gateway';
import {
  scanBarcodeUseCase,
  ScanBarcodeUseCasePayload,
} from '../hexagon/usecases/scan-barcode/scan-barcode.usecase';
import { Barcode } from '../hexagon/models/barcode';

export const createScannerFixture = () => {
  const scannerGateway = new StubScannerGateway();
  let store: TestStore;

  return {
    givenReceivingScan: async (barcode: Barcode, scan: Scan) => {
      scannerGateway.givenReceivingScanFor(barcode, scan);
    },
    whenScanBarcode: async (payload: ScanBarcodeUseCasePayload) => {
      store = createTestStore({ scannerGateway }, stateBuilder().build());
      return store.dispatch(scanBarcodeUseCase(payload));
    },
    thenScannerShouldBeLoading: () => {
      expect(store.getState()).toEqual(
        stateBuilder().withScannerLoading().build(),
      );
    },
    thenScanShouldBe: (scan: Scan) => {
      expect(store.getState()).toEqual(stateBuilder().withScan(scan).build());
    },
    thenScanShouldBeUndefined: () => {
      expect(store.getState()).toEqual(
        stateBuilder().withScan(undefined).build(),
      );
    },
  };
};

export type ScannerFixture = ReturnType<typeof createScannerFixture>;
