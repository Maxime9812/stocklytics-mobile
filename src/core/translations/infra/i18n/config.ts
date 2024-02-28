import i18next from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import translationEn from './en';
import translationFr from './fr';

import { TranslationGateway } from '../../hexagon/gateways/translation.gateway';

export const defaultNS = 'common';
export const resources = {
  en: translationEn,
  fr: translationFr,
};

const init = async (translationGateway: TranslationGateway) => {
  await i18next.use(initReactI18next).init({
    lng: translationGateway.getLocale(),
    defaultNS,
    resources,
  });
};

export default init;
