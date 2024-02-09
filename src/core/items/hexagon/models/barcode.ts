export type BarcodeType = 'EAN_13' | 'QR';

export type Barcode = {
  type: BarcodeType;
  value: string;
};
