import Providers from './src/Providers';
import { createStore } from './src/core/create-store';
import { StubAuthGateway } from './src/core/auth/infra/gateways/auth/stub-auth.gateway';
import { stateBuilder } from './src/core/state-builder';
import { AsyncStorageAuthGateway } from './src/core/auth/infra/gateways/auth/async-storage-auth.gateway';
import axios from 'axios';
import { AxiosAuthGateway } from './src/core/auth/infra/gateways/auth/axios-auth.gateway';
import { StubItemsGateway } from './src/core/items/infra/gateways/stub-items.gateway';
import { StubFoldersGateway } from './src/core/folders/infra/gateways/stub-folders.gateway';

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
  baseURL: 'http://192.168.5.55:3000',
  withCredentials: true,
});
const axiosAuthGateway = new AxiosAuthGateway(axiosInstance);

const itemsGateway = new StubItemsGateway(1000);
itemsGateway.givenItemsInFolder('folder-1', [
  {
    id: 'item-1',
    name: 'Iphone 13 pro max',
    description: 'Item 1 description',
    folderId: 'folder-1',
    quantity: 1,
    createdAt: new Date('2021-01-01T00:00:00.000Z').toISOString(),
  },
]);

const foldersGateway = new StubFoldersGateway(1000);
foldersGateway.givenFoldersInFolder([
  {
    id: 'folder-1',
    name: 'Electronics',
    createdAt: new Date('2021-01-01T00:00:00.000Z').toISOString(),
    itemQuantity: 1,
  },
]);

const store = createStore(
  { authGateway, itemsGateway, foldersGateway },
  stateBuilder().build(),
);

export default function App() {
  return <Providers store={store} />;
}
