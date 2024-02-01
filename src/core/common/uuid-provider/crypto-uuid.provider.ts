import { UUIDProvider } from './UUIDProvider';
import * as Crypto from 'expo-crypto';
export class CryptoUUIDProvider implements UUIDProvider {
  generate(): string {
    return Crypto.randomUUID();
  }
}
