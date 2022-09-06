// @flow

import { createAction } from 'redux-actions';
import { redux } from '@accordo-feed/micro-frontends';

import type { Action } from 'src/redux/types';
import { wrapWithModule } from 'src/redux/utils';

const { setState } = redux;

/*************
 *   TYPES   *
 *************/

type StateType = {
  isChecked: boolean,
  selectedRowKeys: Array<String>
};

const initialState: StateType = {
  isChecked: false,
  isLoading: false,
  selectedRowKeys: []
};

/***************
 *   ACTIONS   *
 ***************/

const wrapWithNamespace = wrapWithModule('pages/customers/bulkEditTable');
const SET_ISCHECKED_STATE = wrapWithNamespace('SET_ISCHECKED_STATE');
const SET_LOADING_STATE = wrapWithNamespace('SET_LOADING_STATE');
const SET_SELECTED_ROW_KEYS = wrapWithNamespace('SET_SELECTED_ROW_KEYS');
const SYNC_CLIENTS_DATA = wrapWithNamespace('SYNC_CLIENTS_DATA');

export const setIsCheckedState = createAction(SET_ISCHECKED_STATE);
export const setLoadingState = createAction(SET_LOADING_STATE);
export const setSelectedRowKeys = createAction(SET_SELECTED_ROW_KEYS);
export const syncClientsData = createAction(SYNC_CLIENTS_DATA);

/***************
 *   REDUCER   *
 ***************/

export default (state: StateType = initialState, action: Action) => {
  const { type, payload } = action;

  const reducer = {
    [SET_ISCHECKED_STATE]: setState('isChecked'),
    [SET_LOADING_STATE]: setState('isLoading'),
    [SET_SELECTED_ROW_KEYS]: (state, payload) => ({
      ...state,
      selectedRowKeys: payload,
      isChecked: payload && payload.length !== 0
    })
  }[type];

  return reducer ? reducer(state, payload) : state;
};
