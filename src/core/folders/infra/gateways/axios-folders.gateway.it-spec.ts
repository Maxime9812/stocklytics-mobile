import axios from 'axios';
import { AxiosFoldersGateway } from './axios-folders.gateway';
import nock from 'nock';
import { folderBuilder } from '../../__tests__/folder.builder';

const BASE_URL = 'http://localhost';
describe('AxiosFoldersGateway', () => {
  let axiosFoldersGateway: AxiosFoldersGateway;

  beforeEach(() => {
    axiosFoldersGateway = new AxiosFoldersGateway(
      axios.create({ baseURL: BASE_URL }),
    );
  });

  describe('getInFolder', () => {
    it('Should return folders', async () => {
      nock(BASE_URL)
        .get('/folders?folderId=folder-id')
        .reply(200, [
          folderBuilder().withId('folder-1').withParentId('folder-id').build(),
          folderBuilder().withId('folder-2').withParentId('folder-id').build(),
        ]);
      expect(await axiosFoldersGateway.getInFolder('folder-id')).toEqual([
        folderBuilder().withId('folder-1').withParentId('folder-id').build(),
        folderBuilder().withId('folder-2').withParentId('folder-id').build(),
      ]);
    });
  });
});
