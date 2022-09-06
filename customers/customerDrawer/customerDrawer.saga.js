// @flow

import { takeLatest, put, all, fork, select, call } from 'redux-saga/effects';
import * as R from 'ramda';
import { notification } from 'antd';

import * as organizationApiCalls from 'src/redux/modules/organization/organization.api';
import * as selectors from 'src/redux/selectors';
import * as customersActions from 'src/pages/customers/customers.duck';
import * as customersApiCalls from '../customers.api';
import * as drawerActions from './customerDrawer.duck';
import { CUSTOMER_DELETED_STATES } from './customerDrawer.constants';
import { getClientPlans } from './customerDrawer.api';
import { mergeObjById, arrayPick } from 'src/utils';
import { customerUtils } from 'src/pages/customers/customers.utils';
import { CONNECTION_STATES } from 'src/pages/customers/customers.constants';

function* updateCustomersTableManuallySaga(data): any {
  // Merge the updated org API custom data into redux
  const existingCustomersData = yield select(selectors.customersDataSelector);
  const updatedCustomersData = mergeObjById(existingCustomersData, data);

  if (updatedCustomersData) {
    yield put(customersActions.setLoadingState(true));
    yield put(customersActions.getCustomersDataSuccess(updatedCustomersData));
  }
}

function* getClientDetailsSaga(action): any {
  const { payload: orgId } = action;
  const customers = yield select(selectors.customersDataSelector);

  const data = yield call(organizationApiCalls.getOrganization, orgId);
  yield put(drawerActions.getCustomerSuccess(data));

  const customerStatus = customerUtils.getCustomerStatusById(orgId)(customers);

  // Get plan data if customer is linked and have O365 data
  if (customerStatus === CONNECTION_STATES.ACTIVE) {
    const o365DashboardData = yield getClientPlans(orgId);
    const plansData = R.pathOr([], ['plans'], o365DashboardData);
    const filteredPlans = arrayPick(['name', 'purchased'])(plansData);
    yield put(drawerActions.getCustomerPlansSuccess(filteredPlans));
    yield put(drawerActions.setCustomerLinkedState(true));
  } else {
    yield put(drawerActions.getCustomerPlansSuccess([]));
  }
  yield call(updateCustomersTableManuallySaga, data);

  yield put(drawerActions.setCustomerLoadingState(false));
  yield put(drawerActions.setCustomerLoadedState(true));
}

function* putClientDetailsSaga(action): any {
  const { payload: formData } = action;
  yield put(drawerActions.setCustomerDrawerFormUpdated(false));
  yield put(drawerActions.setCustomerUpdatingState(true));
  const customer = yield select(selectors.customerDrawerCustomerSelector);

  if (R.isEmpty(formData.email)) {
    formData.email = undefined;
  }

  if (R.isNil(formData.microsoft.tenantId)) {
    formData.microsoft = undefined;
  }

  try {
    const data = yield call(customersApiCalls.putCustomerData, { orgId: customer.id, data: formData });
    const mergedCustomer = R.mergeRight(customer, data);
    yield call(updateCustomersTableManuallySaga, mergedCustomer);
    yield put(drawerActions.resetCustomer());
    notification.success({ message: `Company ${mergedCustomer.name} details updated successfully.` });
  } catch (err) {
    yield put(drawerActions.setCustomerUpdatingState(false));
  }
}

function* deleteCustomerSaga(action): any {
  const orgId = action.payload;
  try {
    yield put(drawerActions.setCustomerDeletedState(CUSTOMER_DELETED_STATES.DELETING));
    yield customersApiCalls.deleteCustomer(orgId);
    yield put(drawerActions.resetCustomer());
    yield put(drawerActions.setCustomerDeletedState(CUSTOMER_DELETED_STATES.DELETED));
    const existingCustomersData = yield select(selectors.customersDataSelector);
    const updatedCustomersData = existingCustomersData.filter(customer => customer.id !== orgId);

    if (updatedCustomersData) {
      yield put(customersActions.getCustomersDataSuccess(updatedCustomersData));
    }
  } catch (err) {
    yield put(drawerActions.setCustomerDeletedState(CUSTOMER_DELETED_STATES.NEED_CONFIRM));
  }
}

export default function*(): any {
  yield all([
    fork(takeLatest, drawerActions.getCustomer, getClientDetailsSaga),
    fork(takeLatest, drawerActions.deleteCustomer, deleteCustomerSaga),
    fork(takeLatest, drawerActions.updateCustomer, putClientDetailsSaga)
  ]);
}
