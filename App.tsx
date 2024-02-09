import Providers from './src/Providers';
import { createStore } from './src/core/create-store';
import { StubAuthGateway } from './src/core/auth/infra/gateways/auth/stub-auth.gateway';
import { stateBuilder } from './src/core/state-builder';
import { AsyncStorageAuthGateway } from './src/core/auth/infra/gateways/auth/async-storage-auth.gateway';
import axios from 'axios';
import { StubItemsGateway } from './src/core/items/infra/gateways/items-gateway/stub-items.gateway';
import { StubFoldersGateway } from './src/core/folders/infra/gateways/stub-folders.gateway';
import { CryptoUUIDProvider } from './src/core/common/uuid-provider/crypto-uuid.provider';
import { StubBarcodeTypeProvider } from './src/core/items/infra/gateways/barcode-type/stub-barcode-type.provider';

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
  baseURL: 'http://192.168.5.62:3000',
  withCredentials: true,
});

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
    barcode: {
      type: 'ean13',
      value: '5410041001204',
    },
    createdAt: new Date('2021-01-01T00:00:00.000Z').toISOString(),
  },
]);

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

const uuidProvider = new CryptoUUIDProvider();

const store = createStore(
  {
    authGateway,
    itemsGateway,
    foldersGateway,
    uuidProvider,
    barcodeTypeProvider: new StubBarcodeTypeProvider(),
  },
  stateBuilder().build(),
);

export default function App() {
  return <Providers store={store} />;
}
