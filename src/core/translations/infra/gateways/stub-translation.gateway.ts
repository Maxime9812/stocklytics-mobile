import { TranslationGateway } from '../../hexagon/gateways/translation.gateway';

export class StubTranslationGateway implements TranslationGateway {
  private locale: string | undefined;
  getLocale(): string {
    return this.locale!;
  }

  givenLocale(locale: string) {
    this.locale = locale;
  }
}
