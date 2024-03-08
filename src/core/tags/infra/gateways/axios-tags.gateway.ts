import {
  CreateTagPayload,
  TagsGateway,
} from '../../hexagon/gateways/tags.gateway';
import { AxiosInstance } from 'axios';
import { Tag } from '../../hexagon/models/tag.model';

export class AxiosTagsGateway implements TagsGateway {
  constructor(private readonly axios: AxiosInstance) {}

  async getAll(): Promise<Tag[]> {
    const response = await this.axios.get('/tags');
    return response.data;
  }

  async createTag(payload: CreateTagPayload) {
    await this.axios.post('/tags', payload);
  }
}
