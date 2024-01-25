import { AuthGateway } from '../gateways/auth.gateway';
import { AppStore } from '../../../create-store';
import { userAuthenticated } from '../../auth.slice';

export const onAuthStateChangeListener = (
  store: AppStore,
  authGateway: AuthGateway,
) => {
  authGateway.onAuthStateChanged((authUser) => {
    store.dispatch(userAuthenticated(authUser));
  });
};
