import * as R from 'ramda';
import { createSelector } from 'reselect';

import { getModuleSelector } from 'src/redux/utils';

export const customersSelector = getModuleSelector('customers');

export const syncCustomersNumSelector = createSelector(customersSelector, R.prop('syncCustomersNum'));

export const totalSyncCustomersNumSelector = createSelector(customersSelector, R.prop('totalSyncCustomersNum'));

export const syncCustomersTimeoutIdSelector = createSelector(customersSelector, R.prop('syncCustomersTimeoutId'));

export const isCustomersSyncedSelector = createSelector(
  syncCustomersNumSelector,
  totalSyncCustomersNumSelector,
  (syncCustomersNum, totalSyncCustomersNum) =>
    totalSyncCustomersNum > 0 && R.equals(syncCustomersNum, totalSyncCustomersNum)
);

export const isShowUpdateCustomersMessageSelector = createSelector(
  customersSelector,
  R.prop('isShowSyncCustomersMessage')
);
