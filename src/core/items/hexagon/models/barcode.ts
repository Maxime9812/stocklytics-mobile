export type BarcodeType = 'ean13' | 'qrcode';

export type Barcode = {
  type: BarcodeType;
  value: string;
};
