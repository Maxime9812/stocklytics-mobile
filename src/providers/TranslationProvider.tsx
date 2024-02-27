import { PropsWithChildren, useEffect } from 'react';
import init from '../core/translations/infra/i18n/config';
import { TranslationGateway } from '../core/translations/hexagon/gateways/translation.gateway';

export default function TranslationProvider({
  children,
  translationGateway,
}: PropsWithChildren<{ translationGateway: TranslationGateway }>) {
  useEffect(() => {
    init(translationGateway);
  }, []);

  return children;
}
