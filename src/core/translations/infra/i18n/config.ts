import i18next from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';

import { TranslationGateway } from '../../hexagon/gateways/translation.gateway';

const init = async (translationGateway: TranslationGateway) => {
  await i18next.use(initReactI18next).init({
    lng: translationGateway.getLocale(),
    defaultNS: 'common',
    resources: {
      en: {
        common: {},
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        auth: (await import('./en/auth')).default,
      },
      fr: {
        common: {},
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        auth: (await import('./fr/auth')).default,
      },
    },
  });
};

export default init;
