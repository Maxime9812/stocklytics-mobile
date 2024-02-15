import { Barcode } from '../../core/scanner/hexagon/models/barcode';
import dayjs from 'dayjs';

type ScannerViewModelParams = {
  interval: number;
  onScan: (barcode: Barcode) => void;
  lastScannedAt?: Date;
  setLastScannedAt: (date: Date) => void;
  getNow: () => Date;
};

export const createScannerViewModel = ({
  onScan,
  lastScannedAt,
  getNow,
  interval,
  setLastScannedAt,
}: ScannerViewModelParams) => {
  const canScan = () => {
    return !(
      lastScannedAt &&
      dayjs(getNow()).diff(dayjs(lastScannedAt), 'millisecond') <= interval
    );
  };
  const scan = (barcode: Barcode) => {
    if (canScan()) {
      onScan(barcode);
      setLastScannedAt(getNow());
    }
  };

  return { scan };
};
