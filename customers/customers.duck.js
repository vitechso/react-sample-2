// @flow

import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { redux } from '@accordo-feed/micro-frontends';

import type { Action } from 'src/redux/types';
import { wrapWithModule } from 'src/redux/utils';

const { setState } = redux;

/*************
 *   TYPES   *
 *************/

export type CustomerDataType = {
  id: string,
  email: string,
  name: string,
  country: string
};

export type CustomerManagerType = {
  fullName: string,
  emailAddress: string,
  phoneNumber: string
};

type StateType = {
  data: Array<CustomerDataType>,
  accountManagers: Array<CustomerManagerType>,
  isLoaded: boolean,
  isLoading: boolean,
  isLinking: boolean,
  isAddDialogOpened: boolean,
  bulkEditView: boolean,
  showSecureAppModal: boolean,
  syncCustomersNum: number,
  totalSyncCustomersNum: number,
  syncCustomersTimeoutId: ?TimeoutID,
  isShowSyncCustomersMessage: boolean,
  drawerClientId: string,
  clientData: Object
};

/*********************
 *   INITIAL STATE   *
 *********************/

const initialState: StateType = {
  data: [],
  accountManagers: [],
  isLoaded: false,
  isLoading: false,
  isLinking: false,
  isAddDialogOpened: false,
  processingCustomers: [],
  bulkEditView: false,
  showSecureAppModal: false,
  syncCustomersNum: 0,
  totalSyncCustomersNum: 0,
  syncCustomersTimeoutId: undefined,
  isShowSyncCustomersMessage: false,
  drawerClientId: '',
  clientData: {}
};

/***************
 *   ACTIONS   *
 ***************/

const wrapWithNamespace = wrapWithModule('pages/customers');
const GET_CUSTOMERS_DATA = wrapWithNamespace('GET_CUSTOMERS_DATA');
export const GET_CUSTOMERS_DATA_SUCCESS = wrapWithNamespace('GET_CUSTOMERS_DATA_SUCCESS');
const SET_CUSTOMER_MANAGERS = wrapWithNamespace('SET_CUSTOMER_MANAGERS');
const SET_LOADING_STATE = wrapWithNamespace('SET_LOADING_STATE');
export const POST_CUSTOMER_DATA = wrapWithNamespace('POST_CUSTOMER_DATA');
const GET_CUSTOMER_LOGIN_LINK = wrapWithNamespace('GET_CUSTOMER_LOGIN_LINK');
const SET_LINKING_STATE = wrapWithNamespace('SET_LINKING_STATE');
const FETCH_CUSTOMERS = wrapWithNamespace('FETCH_CUSTOMERS');
const FETCH_CUSTOMER_ADOPTIONS = wrapWithNamespace('FETCH_CUSTOMER_ADOPTIONS');
const FETCH_CUSTOMER_ADOPTIONS_SUCCESS = wrapWithNamespace('FETCH_CUSTOMER_ADOPTIONS_SUCCESS');
const FETCH_CUSTOMER_USERS = wrapWithNamespace('FETCH_CUSTOMER_USERS');
const FETCH_CUSTOMER_USERS_SUCCESS = wrapWithNamespace('FETCH_CUSTOMER_USERS_SUCCESS');
const FETCH_CUSTOMER_PLANS = wrapWithNamespace('FETCH_CUSTOMER_PLANS');
const FETCH_CUSTOMER_PLANS_SUCCESS = wrapWithNamespace('FETCH_CUSTOMER_PLANS_SUCCESS');
const FETCH_CUSTOMER_AZURE_RESOURCES = wrapWithNamespace('FETCH_CUSTOMER_AZURE_RESOURCES');
const FETCH_CUSTOMER_AZURE_RESOURCES_SUCCESS = wrapWithNamespace('FETCH_CUSTOMER_AZURE_RESOURCES_SUCCESS');
const FETCH_CUSTOMER_SUBSCRIPTIONS = wrapWithNamespace('FETCH_CUSTOMER_SUBSCRIPTIONS');
const FETCH_CUSTOMER_SUBSCRIPTIONS_SUCCESS = wrapWithNamespace('FETCH_CUSTOMER_SUBSCRIPTIONS_SUCCESS');
const FETCH_CUSTOMER_STATE = wrapWithNamespace('FETCH_CUSTOMER_STATE');
const FETCH_CUSTOMER_DETAILS_SUCESS = wrapWithNamespace('FETCH_CUSTOMER_DETAILS_SUCESS');
const FETCH_CUSTOMER_RECOMMENDATIONS = wrapWithNamespace('FETCH_CUSTOMER_RECOMMENDATIONS');
const FETCH_CUSTOMER_RECOMMENDATIONS_SUCCESS = wrapWithNamespace('FETCH_CUSTOMER_RECOMMENDATIONS_SUCCESS');
const SET_ADD_DIALOG_OPENED_STATE = wrapWithNamespace('SET_ADD_DIALOG_OPENED_STATE');
export const REFRESH_OFFICE365 = wrapWithNamespace('REFRESH_OFFICE365');
const MERGE_CUSTOMER_BY_ID = wrapWithNamespace('MERGE_CUSTOMER_BY_ID');
const ADD_PROCESSING_CUSTOMER = wrapWithNamespace('ADD_PROCESSING_CUSTOMER');
const REMOVE_PROCESSING_CUSTOMERS = wrapWithNamespace('REMOVE_PROCESSING_CUSTOMERS');
const HANDLE_CONNECTION_FAILED = wrapWithNamespace('HANDLE_CONNECTION_FAILED');
const HANDLE_CUSTOMER_REPROCESS = wrapWithNamespace('HANDLE_CUSTOMER_REPROCESS');
const SET_BULK_EDIT_VIEW = wrapWithNamespace('SET_BULK_EDIT_VIEW');
const SHOW_SECURE_APP_MODAL = wrapWithNamespace('SHOW_SECURE_APP_MODAL');
const CLOSE_SECURE_APP_MODAL = wrapWithNamespace('CLOSE_SECURE_APP_MODAL');
const ACTION_BUTTON_CLICKED = wrapWithNamespace('ACTION_BUTTON_CLICKED');
const PAUSE_SYNC_CONNECTION = wrapWithNamespace('PAUSE_SYNC_CONNECTION');
const SET_SYNC_CUSTOMERS_NUM = wrapWithNamespace('SET_SYNC_CUSTOMERS_NUM');
const SET_TOTAL_SYNC_CUSTOMERS_NUM = wrapWithNamespace('SET_TOTAL_SYNC_CUSTOMERS_NUM');
const SET_SYNC_CUSTOMERS_MESSAGE_STATE = wrapWithNamespace('SET_SYNC_CUSTOMERS_MESSAGE_STATE');
const SET_SYNC_CUSTOMERS_TIMEOUT_ID = wrapWithNamespace('SET_SYNC_CUSTOMERS_TIMEOUT_ID');
const RESET_SYNC_CUSTOMERS_MESSAGE_SETTINGS = wrapWithNamespace('RESET_SYNC_CUSTOMERS_MESSAGE_SETTINGS');
const GET_SECURITY_RECOMMENDATIONS = wrapWithNamespace('GET_SECURITY_RECOMMENDATIONS');
const GET_SECURITY_RECOMMENDATIONS_SUCCESS = wrapWithNamespace('GET_SECURITY_RECOMMENDATIONS_SUCCESS');
const COPY_COMPANY_INVITE_LINK = wrapWithNamespace('COPY_COMPANY_INVITE_LINK');
const SET_LICENSES_DRAWER_CLIENT_ID = wrapWithNamespace('SET_LICENSES_DRAWER_CLIENT_ID');
const RESET_DRAWER_DATA = wrapWithNamespace('RESET_DRAWER_DATA');

export const getCustomersData = createAction(GET_CUSTOMERS_DATA);
export const getCustomersDataSuccess = createAction(GET_CUSTOMERS_DATA_SUCCESS);
export const setCustomerManagers = createAction(SET_CUSTOMER_MANAGERS);
export const setLoadingState = createAction(SET_LOADING_STATE);
export const postCustomerData = createAction(POST_CUSTOMER_DATA);
export const getCustomerLoginLink = createAction(GET_CUSTOMER_LOGIN_LINK);
export const setLinkingState = createAction(SET_LINKING_STATE);
export const fetchCustomers = createAction(FETCH_CUSTOMERS);
export const fetchCustomerAdoptions = createAction(FETCH_CUSTOMER_ADOPTIONS);
export const fetchCustomerAdoptionsSuccess = createAction(FETCH_CUSTOMER_ADOPTIONS_SUCCESS);
export const fetchCustomerUsers = createAction(FETCH_CUSTOMER_USERS);
export const fetchCustomerUsersSuccess = createAction(FETCH_CUSTOMER_USERS_SUCCESS);
export const fetchCustomerPlans = createAction(FETCH_CUSTOMER_PLANS);
export const fetchCustomerPlansSuccess = createAction(FETCH_CUSTOMER_PLANS_SUCCESS);
export const fetchCustomerAzureResources = createAction(FETCH_CUSTOMER_AZURE_RESOURCES);
export const fetchCustomerAzureResourcesSuccess = createAction(FETCH_CUSTOMER_AZURE_RESOURCES_SUCCESS);
export const fetchCustomerSubscriptions = createAction(FETCH_CUSTOMER_SUBSCRIPTIONS);
export const fetchCustomerSubscriptionsSuccess = createAction(FETCH_CUSTOMER_SUBSCRIPTIONS_SUCCESS);
export const fetchCustomerDetails = createAction(FETCH_CUSTOMER_STATE);
export const fetchCustomerDetailsSuccess = createAction(FETCH_CUSTOMER_DETAILS_SUCESS);
export const fetchCustomerRecommendations = createAction(FETCH_CUSTOMER_RECOMMENDATIONS);
export const fetchCustomerRecommendationsSuccess = createAction(FETCH_CUSTOMER_RECOMMENDATIONS_SUCCESS);
export const setAddDialogOpened = createAction(SET_ADD_DIALOG_OPENED_STATE);
export const refreshOffice365 = createAction(REFRESH_OFFICE365);
export const mergeCustomerById = createAction(MERGE_CUSTOMER_BY_ID);
export const addProcessingCustomer = createAction(ADD_PROCESSING_CUSTOMER);
export const removeProcessingCustomers = createAction(REMOVE_PROCESSING_CUSTOMERS);
export const handleConnectionFailed = createAction(HANDLE_CONNECTION_FAILED);
export const handleCustomerReProcess = createAction(HANDLE_CUSTOMER_REPROCESS);
export const setBulkEditView = createAction(SET_BULK_EDIT_VIEW);
export const showSecureAppModal = createAction(SHOW_SECURE_APP_MODAL);
export const closeSecureAppModal = createAction(CLOSE_SECURE_APP_MODAL);
export const actionButtonClicked = createAction(ACTION_BUTTON_CLICKED);
export const pauseSyncConnection = createAction(PAUSE_SYNC_CONNECTION);
export const setSyncCustomersNum = createAction(SET_SYNC_CUSTOMERS_NUM);
export const setTotalSyncCustomersNum = createAction(SET_TOTAL_SYNC_CUSTOMERS_NUM);
export const setSyncCustomersMessageState = createAction(SET_SYNC_CUSTOMERS_MESSAGE_STATE);
export const setSyncCustomersTimeoutId = createAction(SET_SYNC_CUSTOMERS_TIMEOUT_ID);
export const resetSyncCustomersMessageSettings = createAction(RESET_SYNC_CUSTOMERS_MESSAGE_SETTINGS);
export const getSecurityRecommendations = createAction(GET_SECURITY_RECOMMENDATIONS);
export const getSecurityRecommendationsSuccess = createAction(GET_SECURITY_RECOMMENDATIONS_SUCCESS);
export const copyCompanyInviteLink = createAction(COPY_COMPANY_INVITE_LINK);
export const setLicensesDrawerClientId = createAction(SET_LICENSES_DRAWER_CLIENT_ID);
export const resetDrawerData = createAction(RESET_DRAWER_DATA);

/***************
 *   REDUCER   *
 ***************/

export default (state: StateType = initialState, action: Action) => {
  const { type, payload } = action;

  const reducer = {
    [GET_CUSTOMERS_DATA_SUCCESS]: (state, payload) => {
      const accountManagers = R.uniq((payload || []).map(e => e.accountManager).filter(e => !!e && !!e.fullName));
      return {
        ...state,
        data: payload,
        accountManagers,
        isLoaded: true,
        isLoading: false
      };
    },
    [SET_CUSTOMER_MANAGERS]: setState('accountManagers'),
    [FETCH_CUSTOMER_ADOPTIONS_SUCCESS]: (state, payload) => {
      const { data: customers, clientData: drawerData } = state;
      const { customerId, adoptions } = payload;
      const idx = R.findIndex(R.propEq('id', customerId), customers);

      if (idx > -1) {
        customers[idx] = { ...customers[idx], adoptions };
        return { ...state, data: customers, clientData: { ...drawerData, adoptions } };
      }

      return {
        ...state,
        data: [...customers, { id: customerId, adoptions }],
        clientData: { ...drawerData, adoptions }
      };
    },
    [FETCH_CUSTOMER_USERS_SUCCESS]: (state, payload) => {
      const { data: customers } = state;
      const { customerId, users } = payload;

      if (R.findIndex(R.propEq('id', customerId), customers) > -1) {
        const data = R.map(R.when(R.propEq('id', customerId), R.mergeLeft({ users })), customers);
        return { ...state, data };
      }

      return {
        ...state,
        data: [...customers, { id: customerId, users }]
      };
    },
    [FETCH_CUSTOMER_SUBSCRIPTIONS_SUCCESS]: (state, payload) => {
      const { data: customers } = state;
      const { customerId, subscriptions } = payload;

      if (R.findIndex(R.propEq('id', customerId), customers) > -1) {
        const data = R.map(R.when(R.propEq('id', customerId), R.mergeLeft({ subscriptions })), customers);
        return { ...state, data };
      }

      return {
        ...state,
        data: [...customers, { id: customerId, subscriptions }]
      };
    },
    [FETCH_CUSTOMER_AZURE_RESOURCES_SUCCESS]: (state, payload) => {
      const { data: customers } = state;
      const { customerId, resources: azureResources } = payload;

      if (R.findIndex(R.propEq('id', customerId), customers) > -1) {
        const data = R.map(R.when(R.propEq('id', customerId), R.mergeLeft({ azureResources })), customers);
        return { ...state, data };
      }

      return {
        ...state,
        data: [...customers, { id: customerId, azureResources }]
      };
    },
    [FETCH_CUSTOMER_PLANS_SUCCESS]: (state, payload) => {
      const { data: customers, clientData: drawerData } = state;
      const { customerId, departments, plans, planHighlights } = payload;

      if (R.findIndex(R.propEq('id', customerId), customers) > -1) {
        const data = R.map(
          R.when(R.propEq('id', customerId), R.mergeLeft({ departments, plans, planHighlights })),
          customers
        );
        return { ...state, data, clientData: { ...drawerData, ...payload } };
      }

      return {
        ...state,
        clientData: { ...drawerData, ...payload },
        data: [...customers, { id: customerId, departments, plans, planHighlights }]
      };
    },
    [FETCH_CUSTOMER_DETAILS_SUCESS]: (state, payload) => {
      const { data: customers } = state;
      const { customerId, details } = payload;

      if (R.findIndex(R.propEq('id', customerId), customers) > -1) {
        const data = R.map(R.when(R.propEq('id', customerId), R.mergeLeft({ ...details })), customers);
        return { ...state, data };
      }

      return {
        ...state,
        data: [...customers, { id: customerId, ...details }]
      };
    },
    [FETCH_CUSTOMER_RECOMMENDATIONS_SUCCESS]: (state, payload) => {
      const { data: customers } = state;
      const { customerId, recommendations = [] } = payload;
      const newCustomers = R.map(R.when(R.propEq('id', customerId), R.mergeLeft({ recommendations })), customers);

      return {
        ...state,
        data: newCustomers
      };
    },
    [GET_SECURITY_RECOMMENDATIONS_SUCCESS]: (state, payload) => {
      const { data: customers } = state;
      const { customerId, securityRecommendations = [] } = payload;
      const newCustomers = R.map(
        R.when(R.propEq('id', customerId), R.mergeLeft({ securityRecommendations })),
        customers
      );

      return {
        ...state,
        data: newCustomers
      };
    },
    [SET_LINKING_STATE]: setState('isLinking'),
    [SET_LOADING_STATE]: setState('isLoading'),
    [SET_ADD_DIALOG_OPENED_STATE]: setState('isAddDialogOpened'),
    [ADD_PROCESSING_CUSTOMER]: (state, payload) => {
      return {
        ...state,
        processingCustomers: [...state.processingCustomers, payload]
      };
    },
    [REMOVE_PROCESSING_CUSTOMERS]: (state, payload) =>
      R.reduce(
        (acc, customerId) => {
          acc.processingCustomers = R.reject(R.propEq('id', customerId), acc.processingCustomers);
          return acc;
        },
        R.clone(state),
        payload
      ),
    [MERGE_CUSTOMER_BY_ID]: (state, payload) => {
      const { data: customers } = state;
      const { customerOrgId, merged } = payload;
      const oldIndex = customers.findIndex(R.propEq('id', customerOrgId));
      const newCustomer = R.mergeDeepRight(customers[oldIndex], merged);

      customers.splice(oldIndex, 1, newCustomer);

      return {
        ...state,
        data: customers
      };
    },
    [SET_BULK_EDIT_VIEW]: setState('bulkEditView'),
    [SHOW_SECURE_APP_MODAL]: state => ({
      ...state,
      showSecureAppModal: true
    }),
    [CLOSE_SECURE_APP_MODAL]: state => ({
      ...state,
      showSecureAppModal: false
    }),
    [SET_SYNC_CUSTOMERS_NUM]: setState('syncCustomersNum'),
    [SET_TOTAL_SYNC_CUSTOMERS_NUM]: setState('totalSyncCustomersNum'),
    [SET_SYNC_CUSTOMERS_MESSAGE_STATE]: setState('isShowSyncCustomersMessage'),
    [SET_SYNC_CUSTOMERS_TIMEOUT_ID]: setState('syncCustomersTimeoutId'),
    [RESET_SYNC_CUSTOMERS_MESSAGE_SETTINGS]: state => ({
      ...state,
      syncCustomersNum: 0,
      totalSyncCustomersNum: 0,
      syncCustomersTimeoutId: undefined,
      isShowSyncCustomersMessage: false
    }),
    [SET_LICENSES_DRAWER_CLIENT_ID]: setState('drawerClientId'),
    [RESET_DRAWER_DATA]: state => ({
      ...state,
      drawerClientId: '',
      clientData: {}
    })
  }[type];

  return reducer ? reducer(state, payload) : state;
};
