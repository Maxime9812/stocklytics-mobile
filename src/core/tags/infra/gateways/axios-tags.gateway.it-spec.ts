import axios from 'axios';
import { AxiosTagsGateway } from './axios-tags.gateway';
import nock from 'nock';

const BASE_URL = 'http://localhost';
describe('AxiosTagsGateway', () => {
  let axiosTagsGateway: AxiosTagsGateway;

  beforeEach(() => {
    axiosTagsGateway = new AxiosTagsGateway(
      axios.create({ baseURL: BASE_URL }),
    );
  });

  it('Should return tags', async () => {
    nock(BASE_URL)
      .get('/tags')
      .reply(200, [
        {
          id: 'tag-id',
          name: 'Tag name',
        },
      ]);

    const tags = await axiosTagsGateway.getAll();

    expect(tags).toEqual([
      {
        id: 'tag-id',
        name: 'Tag name',
      },
    ]);
  });

  describe('create', () => {
    it('Should create a tag', async () => {
      const scope = nock(BASE_URL)
        .post('/tags', { id: 'tag-id', name: 'Tag name' })
        .reply(201);

      await axiosTagsGateway.createTag({
        id: 'tag-id',
        name: 'Tag name',
      });

      expect(scope.isDone()).toBe(true);
    });
  });
});
