import {
  CreateTagPayload,
  TagsGateway,
} from '../../hexagon/gateways/tags.gateway';
import { Tag } from '../../hexagon/models/tag.model';

export class StubTagsGateway implements TagsGateway {
  private tags: Tag[] = [];
  lastCreatedTag?: CreateTagPayload;
  async getAll() {
    return this.tags;
  }

  async createTag(payload: CreateTagPayload) {
    this.lastCreatedTag = payload;
    return;
  }

  givenTags(tags: Tag[]) {
    this.tags = tags;
  }
}
