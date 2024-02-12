export type BarcodeType = 'ean13' | 'qrcode' | 'code128';

export type Barcode = {
  type: BarcodeType;
  value: string;
};
