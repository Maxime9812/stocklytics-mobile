import { Tag } from '../models/tag.model';

export type CreateTagPayload = {
  id: string;
  name: string;
};

export interface TagsGateway {
  getAll(): Promise<Tag[]>;
  createTag(payload: CreateTagPayload): Promise<void>;
}
