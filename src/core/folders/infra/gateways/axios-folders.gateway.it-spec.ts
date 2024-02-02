import axios from 'axios';
import { AxiosFoldersGateway } from './axios-folders.gateway';
import nock from 'nock';
import { folderBuilder } from '../../__tests__/folder.builder';
import { AddFolderPayload } from '../../hexagon/gateways/folders.gateway';

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

  describe('addFolder', () => {
    it('Should return folder added', async () => {
      const payload: AddFolderPayload = {
        id: 'new-folder-id',
        name: 'New folder',
        parentId: 'parent-id',
      };
      const folderAdded = folderBuilder()
        .withId('new-folder-id')
        .withName('New folder')
        .withParentId('parent-id')
        .build();

      nock(BASE_URL).post('/folders', payload).reply(201, folderAdded);
      expect(await axiosFoldersGateway.addFolder(payload)).toEqual(folderAdded);
    });
  });
});
