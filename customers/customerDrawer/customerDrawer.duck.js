// @flow

import { createAction } from 'redux-actions';
import { redux } from '@accordo-feed/micro-frontends';

import type { Action } from 'src/redux/types';
import { wrapWithModule } from 'src/redux/utils';
import { CUSTOMER_DELETED_STATES } from './customerDrawer.constants';

const { setState } = redux;

/*************
 *   TYPES   *
 *************/

type StateType = {
  data: Object,
  plans: Array<Object>,
  isLoaded: boolean,
  isLoading: boolean,
  isFormUpdated: boolean,
  customerDeletedState: string,
  isCustomerUpdating: boolean
};

/*********************
 *   INITIAL STATE   *
 *********************/

const initialState: StateType = {
  data: {},
  plans: [],
  isLoaded: false,
  isLoading: false,
  isFormUpdated: false,
  customerDeletedState: CUSTOMER_DELETED_STATES.HIDE,
  isCustomerUpdating: false,
  isCustomerLinked: false,
  selectedCustomerId: ''
};

/***************
 *   ACTIONS   *
 ***************/

const wrapWithNamespace = wrapWithModule('pages/customers/customerDrawer');
const SET_CUSTOMER_DRAWER_FORM_UPDATED = wrapWithNamespace('SET_CUSTOMER_DRAWER_FORM_UPDATED');
const RESET_CUSTOMER = wrapWithNamespace('RESET_CUSTOMER');
const GET_CUSTOMER = wrapWithNamespace('GET_CUSTOMER');
export const PUT_CUSTOMER = wrapWithNamespace('PUT_CUSTOMER');
const GET_CUSTOMER_SUCCESS = wrapWithNamespace('GET_CUSTOMER_SUCCESS');
const GET_CUSTOMER_PLANS_SUCCES = wrapWithNamespace('GET_CUSTOMER_PLANS_SUCCES');
export const DELETE_CUSTOMER = wrapWithNamespace('DELETE_CUSTOMER');
const SET_CUSTOMER_LOADING_STATE = wrapWithNamespace('SET_CUSTOMER_LOADING_STATE');
const SET_CUSTOMER_LOADED_STATE = wrapWithNamespace('SET_CUSTOMER_LOADED_STATE');
const SET_CUSTOMER_UPDATING_STATE = wrapWithNamespace('SET_CUSTOMER_UPDATING_STATE');
const SET_CUSTOMER_DELETED_STATE = wrapWithNamespace('SET_CUSTOMER_DELETED_STATE');
const SET_CUSTOMER_LINKED_STATE = wrapWithNamespace('SET_CUSTOMER_LINKED_STATE');
const SET_SELECTED_CUSTOMER_ID = wrapWithNamespace('SET_SELECTED_CUSTOMER_ID');

export const setCustomerDrawerFormUpdated = createAction(SET_CUSTOMER_DRAWER_FORM_UPDATED);
export const resetCustomer = createAction(RESET_CUSTOMER);
export const getCustomer = createAction(GET_CUSTOMER);
export const updateCustomer = createAction(PUT_CUSTOMER);
export const getCustomerSuccess = createAction(GET_CUSTOMER_SUCCESS);
export const deleteCustomer = createAction(DELETE_CUSTOMER);
export const getCustomerPlansSuccess = createAction(GET_CUSTOMER_PLANS_SUCCES);
export const setCustomerLoadingState = createAction(SET_CUSTOMER_LOADING_STATE);
export const setCustomerLoadedState = createAction(SET_CUSTOMER_LOADED_STATE);
export const setCustomerUpdatingState = createAction(SET_CUSTOMER_UPDATING_STATE);
export const setCustomerDeletedState = createAction(SET_CUSTOMER_DELETED_STATE);
export const setCustomerLinkedState = createAction(SET_CUSTOMER_LINKED_STATE);
export const setSelectedCustomerId = createAction(SET_SELECTED_CUSTOMER_ID);

/***************
 *   REDUCER   *
 ***************/

export default (state: StateType = initialState, action: Action) => {
  const { type, payload } = action;
  const reducer = {
    [SET_CUSTOMER_DRAWER_FORM_UPDATED]: setState('isFormUpdated'),
    [SET_CUSTOMER_UPDATING_STATE]: setState('isCustomerUpdating'),
    [GET_CUSTOMER_SUCCESS]: (state, payload) => ({
      ...state,
      data: payload,
      isFormUpdated: false,
      isCustomerUpdating: false
    }),
    [SET_CUSTOMER_LOADED_STATE]: setState('isLoaded'),
    [SET_CUSTOMER_LOADING_STATE]: setState('isLoading'),
    [SET_CUSTOMER_DELETED_STATE]: setState('customerDeletedState'),
    [GET_CUSTOMER_PLANS_SUCCES]: setState('plans'),
    [SET_CUSTOMER_LINKED_STATE]: setState('isCustomerLinked'),
    [SET_SELECTED_CUSTOMER_ID]: setState('selectedCustomerId'),
    [RESET_CUSTOMER]: () => initialState
  }[type];

  return reducer ? reducer(state, payload) : state;
};
