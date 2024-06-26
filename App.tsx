import Providers from './src/Providers';

import { createStore } from './src/core/create-store';
import { StubAuthGateway } from './src/core/auth/infra/gateways/auth/stub-auth.gateway';
import { stateBuilder } from './src/core/state-builder';
import { AsyncStorageAuthGateway } from './src/core/auth/infra/gateways/auth/async-storage-auth.gateway';
import axios from 'axios';
import { StubItemsGateway } from './src/core/items/infra/gateways/items-gateway/stub-items.gateway';
import { StubFoldersGateway } from './src/core/folders/infra/gateways/stub-folders.gateway';
import { CryptoUUIDProvider } from './src/core/common/uuid-provider/crypto-uuid.provider';
import { AxiosAuthGateway } from './src/core/auth/infra/gateways/auth/axios-auth.gateway';
import { AxiosItemsGateway } from './src/core/items/infra/gateways/items-gateway/axios-items.gateway';
import { AxiosFoldersGateway } from './src/core/folders/infra/gateways/axios-folders.gateway';
import { AxiosScannerGateway } from './src/core/scanner/infra/gateways/axios-scanner.gateway';
import { CameraVisionPermissionGateway } from './src/core/permissions/infra/gateways/camera/camera-vision-permission.gateway';
import { ImagePickerMediaLibraryPermissionGateway } from './src/core/permissions/infra/gateways/media-library/image-picker-media-library-permission.gateway';
import { LocalizationTransactionGateway } from './src/core/translations/infra/gateways/localization-transaction.gateway';
import { StubTagsGateway } from './src/core/tags/infra/gateways/stub-tags.gateway';
import { AxiosTagsGateway } from './src/core/tags/infra/gateways/axios-tags.gateway';

const stubAuthGateway = new StubAuthGateway(2000);
stubAuthGateway.givenUserWithCredentials({
  credentials: {
    email: 'john.doe@gmail.com',
    password: '123456',
  },
  user: {
    id: 'user-id',
    fullName: 'John Doe',
    email: 'john.doe@gmail.com',
  },
});
const authGateway = new AsyncStorageAuthGateway(stubAuthGateway);
const axiosInstance = axios.create({
  baseURL: 'http://192.168.5.71:3000',
  withCredentials: true,
});

const axiosAuthGateway = new AxiosAuthGateway(axiosInstance);

const itemsGateway = new StubItemsGateway(200);
itemsGateway.givenItemsInFolder('folder-1', [
  {
    id: 'item-1',
    name: 'Iphone 13 pro max',
    note: 'Item 1 description',
    folderId: 'folder-1',
    quantity: 1,
    tags: [
      {
        id: 'tag-1',
        name: 'Apple',
      },
      {
        id: 'tag-2',
        name: 'Smartphone',
      },
    ],
    imageUrl: 'https://via.placeholder.com/500',
    createdAt: new Date('2021-01-01T00:00:00.000Z').toISOString(),
  },
]);

const axiosItemGateways = new AxiosItemsGateway(axiosInstance);

const foldersGateway = new StubFoldersGateway(200);
foldersGateway.givenFoldersInFolder([
  {
    id: 'folder-1',
    name: 'Electronics',
    createdAt: new Date('2021-01-01T00:00:00.000Z').toISOString(),
    parentId: null,
    itemQuantity: 1,
  },
  {
    id: 'folder-2',
    name: 'Others',
    parentId: 'folder-1',
    createdAt: new Date('2021-01-01T00:00:00.000Z').toISOString(),
    itemQuantity: 0,
  },
]);

const axiosFolderGateway = new AxiosFoldersGateway(axiosInstance);

const tagsGateway = new StubTagsGateway();

const axiosTagsGateway = new AxiosTagsGateway(axiosInstance);

const uuidProvider = new CryptoUUIDProvider();
const scannerGateway = new AxiosScannerGateway(axiosInstance);
const cameraPermissionGateway = new CameraVisionPermissionGateway();
const mediaLibraryPermissionGateway =
  new ImagePickerMediaLibraryPermissionGateway();

const store = createStore(
  {
    authGateway: axiosAuthGateway,
    itemsGateway: axiosItemGateways,
    foldersGateway: axiosFolderGateway,
    uuidProvider,
    scannerGateway,
    cameraPermissionGateway,
    mediaLibraryPermissionGateway,
    tagsGateway: axiosTagsGateway,
  },
  stateBuilder().build(),
);

const translationGateway = new LocalizationTransactionGateway();

export default function App() {
  return <Providers store={store} translationGateway={translationGateway} />;
}
