export type BarcodeType = 'ean13' | 'ean8' | 'qrcode' | 'code128';

export type Barcode = {
  type: BarcodeType;
  value: string;
};
