import { Tag } from '../models/tag.model';

export interface TagsGateway {
  getAll(): Promise<Tag[]>;
}
