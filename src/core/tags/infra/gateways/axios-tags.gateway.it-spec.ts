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
});
