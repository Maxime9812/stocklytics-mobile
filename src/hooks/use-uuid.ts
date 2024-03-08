import { CryptoUUIDProvider } from '../core/common/uuid-provider/crypto-uuid.provider';

export const useUuid = () => {
  return new CryptoUUIDProvider();
};
