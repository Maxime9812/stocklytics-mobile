import { TagsGateway } from '../../hexagon/gateways/tags.gateway';
import { Tag } from '../../hexagon/models/tag.model';

export class StubTagsGateway implements TagsGateway {
  private tags: Tag[] = [];
  async getAll() {
    return this.tags;
  }

  givenTags(tags: Tag[]) {
    this.tags = tags;
  }
}
