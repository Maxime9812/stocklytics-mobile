import { UUIDProvider } from './UUIDProvider';

export class DeterministicUUIDProvider implements UUIDProvider {
  private uuid: string = '';
  generate(): string {
    return this.uuid;
  }
  givenUUID(uuid: string) {
    this.uuid = uuid;
  }
}
