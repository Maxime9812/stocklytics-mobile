import i18next from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import translationEn from './en/translation';
import translationFr from './fr/translation';

import { TranslationGateway } from '../../hexagon/gateways/translation.gateway';

const init = (translationGateway: TranslationGateway) => {
  i18next.use(initReactI18next).init({
    lng: translationGateway.getLocale(),
    resources: {
      en: {
        translation: translationEn,
      },
      fr: {
        translation: translationFr,
      },
    },
  });
};

export default init;
