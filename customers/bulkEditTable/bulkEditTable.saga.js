// @flow

import { takeLatest, put, all, fork, select } from 'redux-saga/effects';

import * as actions from './bulkEditTable.duck';
import * as customerActions from 'src/pages/customers/customers.duck';
import * as bulkEditTableSelectors from './bulkEditTable.selector';
import * as selectors from 'src/redux/selectors';
import * as apiCalls from './bulkEditTable.api';

/*************
 *   SAGAS   *
 *************/

function* setIsCheckedStateSaga(): any {
  const isChecked = yield select(bulkEditTableSelectors.isCheckedSelectedSelector);

  if (isChecked) {
    const allDataKey = yield select(bulkEditTableSelectors.availableDataKeySelector);
    yield put(actions.setSelectedRowKeys(allDataKey));
  } else {
    yield put(actions.setSelectedRowKeys([]));
  }
}

function* syncClientsDataSaga(): any {
  const orgId = yield select(selectors.orgIdSelector);
  const selectedKey = yield select(bulkEditTableSelectors.selectedRowKeysSelector);

  yield put(actions.setLoadingState(true));
  try {
    yield put(actions.setSelectedRowKeys([]));
    yield apiCalls.setBulkEnable({ orgId, data: selectedKey });
    yield put(customerActions.setBulkEditView(false));
    yield put(actions.setLoadingState(false));
  } catch (error) {
    yield put(actions.setLoadingState(false));
  }
}

export default function*(): any {
  yield all([
    fork(takeLatest, actions.setIsCheckedState, setIsCheckedStateSaga),
    fork(takeLatest, actions.syncClientsData, syncClientsDataSaga)
  ]);
}
