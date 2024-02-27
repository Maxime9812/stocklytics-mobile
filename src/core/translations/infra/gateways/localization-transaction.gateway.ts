import { TranslationGateway } from '../../hexagon/gateways/translation.gateway';
import { getLocales } from 'expo-localization';

export class LocalizationTransactionGateway implements TranslationGateway {
  getLocale(): string {
    return getLocales()[0].languageCode || 'en';
  }
}
