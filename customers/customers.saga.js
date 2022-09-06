// @flow

import * as R from 'ramda';
import { takeLatest, put, all, fork, select, call } from 'redux-saga/effects';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { command, router } from '@accordo-feed/micro-frontends';
import { notification } from 'antd';
import { getSecurityControlProfileData } from 'src/pages/dashboard/securityScore/drawer/drawer.duck';
import { genControlProfileQuery } from 'src/pages/dashboard/securityScore/drawer/drawer.utils';
import ErrorToasterLang from 'src/components/errorModal/errorToaster.lang';
import { CONNECTION_STATES, CONNECTION_TYPE } from 'src/pages/customers/customers.constants';
import { ERROR_CODES, PATHS, RECOMMENDATIONS_ACTION_TYPES } from 'src/constants';
import { getSecurityData } from 'src/pages/dashboard/dashboard.api';
import * as organizationApiCalls from 'src/redux/modules/organization/organization.api';
import * as actionsError from 'src/redux/modules/errorModal/errorModal.duck';
import * as selectors from 'src/redux/selectors';
import * as actions from './customers.duck';
import * as apiCalls from './customers.api';
import { customerUtils } from './customers.utils';

const popUpTitle = 'Sign in to Microsoft account';
const history = router.getHistory({
  createHistory: createBrowserHistory
});
const CustomerProfilePathRegex = /companies\/(acc_.+?)/i;

const { ONEDRIVE_DATA_FLUCTUATION, ONEDRIVE_FILE_FLUCTUATION } = RECOMMENDATIONS_ACTION_TYPES;

/*************
 *   SAGAS   *
 *************/

function* determineActionSaga({ payload: customer }): any {
  if (customerUtils.hasDelegatedAccessAppConnect(customer)) {
    yield apiCalls.enableSingleAppConnect(customer.id);
  } else if (customerUtils.isNeedReconnect(customer)) {
    yield call(command.navigateTo, PATHS.SECURE_APP);
  } else {
    yield put(actions.getCustomerLoginLink(customer));
  }
}

function* disableSingleAppConnectSaga({ payload: customer }): any {
  try {
    yield apiCalls.disableSingleAppConnect(customer.id);
  } catch (error) {
    console.log(error);
  }
}

function* getCustomersDataSaga(): any {
  yield put(actions.setLoadingState(true));
  try {
    yield call(fetchCustomersSaga);
  } catch (err) {
    yield put(actions.setLoadingState(false));
  }
}

function* fetchCustomersSaga(): any {
  try {
    const processingCustomers = yield select(selectors.customersProcessingListSelector);

    const orgId = yield select(selectors.orgIdSelector);
    let customers = yield apiCalls.getCustomersData(orgId);
    let changedCustomers = [];
    let unchangedCustomers = [];

    processingCustomers.forEach(item => {
      const { id: customerOrgId } = item;
      const currentProcessProps = customerUtils.generateCustomerProcessData(customerOrgId)(customers);

      // check the running customer data has been changed
      // if changed save it to the to be remove customer ID array
      if (R.not(R.equals(item, currentProcessProps))) {
        changedCustomers.push(customerOrgId);
      } else {
        unchangedCustomers.push(customerOrgId);
      }
    });

    // batch update unchangedCustomers to in-progress
    if (unchangedCustomers.length) {
      unchangedCustomers.forEach(customerOrgId => {
        customers = customerUtils.updateCustomersById({ customerOrgId })(customers);
      });
      unchangedCustomers = [];
    }

    // batch remove the customer ids from the processingCustomers array
    if (changedCustomers.length) {
      yield put(actions.removeProcessingCustomers(changedCustomers));
      changedCustomers = [];
    }

    const { pathname } = history.getCurrentLocation();
    if (CustomerProfilePathRegex.exec(pathname)) {
      const customerId = pathname.slice(pathname.indexOf('/') + 1, pathname.indexOf('/') + 41);
      yield put(actions.fetchCustomerDetails(customerId));
    }
    yield put(actions.getCustomersDataSuccess(customers));
  } catch (e) {
    console.error(e);
  }
}

function* fetchCustomerAdoptionsSaga({ payload: customerId }): any {
  try {
    const adoptions = yield apiCalls.getCustomerAdoptions(customerId);
    yield put(actions.fetchCustomerAdoptionsSuccess({ customerId, adoptions }));
  } catch (e) {}
}

function* fetchCustomerUsersSaga({ payload: customerId }): any {
  try {
    const customerUsers = yield apiCalls.getCustomerUsers(customerId);
    yield put(
      actions.fetchCustomerUsersSuccess({
        customerId,
        ...customerUsers
      })
    );
  } catch (e) {}
}

function* fetchCustomerPlansSaga({ payload: customerId }): any {
  try {
    const customerPlans = yield apiCalls.getCustomerDashboard(customerId);
    yield put(actions.fetchCustomerPlansSuccess({ customerId, ...customerPlans }));
  } catch (e) {}
}

function* fetchCustomerAzureResourcesSaga({ payload }): any {
  try {
    const { orgId, partnerId } = payload;
    const resources = yield apiCalls.getCustomerAzureResources({ orgId, partnerId });
    yield put(actions.fetchCustomerAzureResourcesSuccess({ customerId: orgId, resources }));
  } catch (e) {}
}

function* fetchCustomerSubscriptionsSaga({ payload: customerId }): any {
  try {
    const subscriptions = [];
    yield put(actions.fetchCustomerSubscriptionsSuccess({ customerId, subscriptions }));
  } catch (e) {}
}

function* fetchCustomerDetailsSaga({ payload: customerId }): any {
  try {
    const customerDetails = yield organizationApiCalls.getOrganization(customerId);
    yield put(actions.fetchCustomerDetailsSuccess({ customerId, details: customerDetails }));
    yield put(actions.fetchCustomerAdoptions(customerId));
    yield put(actions.fetchCustomerPlans(customerId));
    yield put(actions.fetchCustomerUsers(customerId));
    yield put(actions.getSecurityRecommendations(customerId));
    yield put(actions.fetchCustomerSubscriptions(customerId));
    yield put(actions.fetchCustomerRecommendations(customerId));
    yield put(actions.fetchCustomerAzureResources({ orgId: customerId, partnerId: customerDetails.mspId }));
    yield put(getSecurityControlProfileData(customerId));
  } catch (e) {}
}

function* fetchCustomerRecommendationsSaga({ payload: customerId }): any {
  try {
    const payload = yield apiCalls.getCustomerRecommendations(customerId);

    const spec = R.applySpec({
      type: R.identity,
      // $FlowIgnore
      impact: R.pipe(R.nthArg(1), R.prop('impact')),
      // $FlowIgnore
      resource: R.pipe(R.nthArg(1), R.prop('resource')),
      // $FlowIgnore
      description: R.pipe(R.nthArg(1), R.prop('recommendedActions'))
    });
    const genericMapper = R.curry(spec);
    const mappers = {
      monthlyRevenue: genericMapper('Monthly Revenue'),
      engagement: genericMapper('Engagement'),
      consultingRevenue: genericMapper('Consulting Revenue'),
      optimize: genericMapper('Optimize'),
      savings: genericMapper('Savings'),
      storage: genericMapper('Storage'),
      security: genericMapper('Security')
    };

    const oneDriveData = customerUtils.filterByRecommendationType(payload?.storage ?? [], ONEDRIVE_DATA_FLUCTUATION);
    const oneDriveFiles = customerUtils.filterByRecommendationType(payload?.storage ?? [], ONEDRIVE_FILE_FLUCTUATION);
    const storage = [oneDriveFiles, oneDriveData].map(groupItem => {
      if (groupItem.length > 0) {
        const impact = customerUtils.getHighestImpact(groupItem);
        const lastUpdated = groupItem[0].lastUpdated;
        const recommendedActions = {
          ...groupItem[0].recommendedActions,
          type: `storage_${groupItem[0].recommendedActions.type}`
        };
        const resource = groupItem[0].resource;
        return { impact, lastUpdated, recommendedActions, resource };
      }
      return null;
    });

    const recommendationsData = {
      ...payload,
      monthlyRevenue: payload?.monthlyRevenue || [],
      engagement: payload?.engagement || [],
      consultingRevenue: payload?.consultingRevenue || [],
      optimize: payload?.optimize || [],
      savings: payload?.savings || [],
      storage: R.reject(R.isNil)(storage),
      security: payload?.security || []
    };

    const recommendations = R.chain(key => [...R.map(mappers[key], recommendationsData[key])], [
      'monthlyRevenue',
      'engagement',
      'consultingRevenue',
      'optimize',
      'savings',
      'storage',
      'security'
    ]);

    yield put(actions.fetchCustomerRecommendationsSuccess({ customerId, recommendations }));
  } catch (e) {
    console.error(e);
  }
}

function* saveAndLinkCustomerSaga({ payload }): any {
  const { shouldLink } = payload;
  const restructureFn = R.pipe(R.prop('customers'), R.map(R.omit(['id'])));
  const customers = restructureFn(payload);
  yield put(actions.setLinkingState(true));
  const orgId = yield select(selectors.orgIdSelector);
  const popup = shouldLink && customers.length === 1 && customerUtils.generateLoadingNewWindow(popUpTitle);
  const tenantId = customers[0].microsoft?.tenantId ?? '';

  try {
    const data = yield all(
      customers.map(customer => {
        if (R.isEmpty(customer.email)) {
          customer.email = undefined;
        }
        if (R.isEmpty(customer.microsoft?.tenantId ?? '')) {
          customer.microsoft = undefined;
        }
        return apiCalls.postCustomerData({ orgId, data: customer });
      })
    );

    // if were saving only 1 customer - link immediately
    if (data.length === 1 && shouldLink) {
      const loginData = R.isEmpty(tenantId) ? { ...data[0], popup } : { ...data[0], tenantId, popup };
      yield put(actions.getCustomerLoginLink(loginData));
    } else {
      // else add to customers table manually because of the elastic search delay
      const existingCustomers = yield select(selectors.customersDataSelector);
      const mergedCustomers = R.concat(data, existingCustomers);
      yield put(actions.getCustomersDataSuccess(mergedCustomers));
      yield put(actions.setLinkingState(false));
      yield put(actions.setAddDialogOpened(false));
    }
  } catch (err) {
    yield put(actions.setLinkingState(false));
  }
}

function* linkCustomerSaga({ payload }): any {
  const { id: customerOrgId, microsoft, office365Status, tenantId, popup = undefined } = payload;
  const connectionType = R.path(['office365', 'connectionType'], payload);
  yield put(actions.setLinkingState(true));
  const newWindow = popup || customerUtils.generateLoadingNewWindow(popUpTitle);
  const processFailed = office365Status === CONNECTION_STATES.PROCESS_FAILED;

  // call consumption /state endpoint to init consumption document for the first link
  yield apiCalls.getCustomerState(customerOrgId);

  if (customerUtils.hasLinkButton(payload) || processFailed) {
    // call consumption /login endpoint to get login O365 link
    const login = yield apiCalls.getCustomerLogin(customerOrgId);

    const loginURL = tenantId ? login.uri.replace(/organizations/, tenantId) : login.uri;

    // always ask for login/password if customer don't have delegated access enabled
    const redirectUrl =
      microsoft && microsoft.allowDelegatedAccess && connectionType !== CONNECTION_TYPE.PARTNER_ADMIN
        ? loginURL
        : `${loginURL}&prompt=login`;

    customerUtils.redirectNewWindow(newWindow, redirectUrl);
  } else {
    newWindow.close();
  }

  yield put(actions.setLinkingState(false));
  yield put(actions.setAddDialogOpened(false));
}

function* refreshOffice365Saga({ payload: customerOrgId }): any {
  // store manually retried customer to processingCustomers in redux store
  try {
    const customers = yield select(selectors.customersDataSelector);
    const customerDetails = yield organizationApiCalls.getOrganization(customerOrgId);
    const processProps = yield customerUtils.generateCustomerProcessData(customerOrgId)(customers);
    yield put(actions.addProcessingCustomer(processProps));

    // call refresh api after stored the old customer
    yield apiCalls.refreshOffice365(customerOrgId);

    notification.success({
      message: 'Manual Refresh Started',
      description: 'Refresh for ' + customerDetails.name + ' will take 5-15 minutes.'
    });
  } catch (e) {
    notification.error({
      message: 'Failed manual refresh',
      description: 'An error occured while manual refresh started.'
    });
  }
}

function* handleConnectionFailedSaga({ payload: { code } }): any {
  try {
    const { title, message } =
      parseInt(code, 10) === ERROR_CODES.LINKING_PERMISSION_DENIED
        ? ErrorToasterLang.permissionDenied
        : ErrorToasterLang.genericError;

    yield put(actionsError.showErrorToaster({ title, message, errorCode: code }));
  } catch (e) {}

  yield put(actions.fetchCustomers());
}

function* handleCustomerReProcessSaga({ payload: customer }): any {
  if (customerUtils.isFromPartnerCenter(customer) && !customerUtils.isAppConnect(customer)) {
    yield put(actions.getCustomerLoginLink(customer));
  } else {
    yield put(
      actions.mergeCustomerById({
        customerOrgId: customer.id,
        merged: { isUserProcessing: true }
      })
    );
    yield put(actions.refreshOffice365(customer.id));
  }
}

function* getSecurityRecommendationsSaga({ payload: clientId }): any {
  try {
    const partnerId = yield select(selectors.orgIdSelector);
    const query = genControlProfileQuery({
      clientId,
      partnerId
    });

    const data = yield getSecurityData(query);
    const securityRecommendations = R.path(['hits', 'hits', '0', '_source', 'controlScores'], data);

    yield put(
      actions.getSecurityRecommendationsSuccess({
        customerId: clientId,
        securityRecommendations
      })
    );
  } catch (err) {
    console.error(err);
  }
}

function* copyCompanyInviteLinkSaga({ payload, ...props }): any {
  try {
    const { id, tenantId } = payload;
    const login = yield apiCalls.getCustomerLogin(id);
    const loginURL = tenantId ? login.uri.replace(/organizations/, tenantId) : login.uri;
    navigator.clipboard.writeText(loginURL);
    notification.success({
      message: 'Copied to clipboard',
      description: 'Invite link successfully copied to clipboard'
    });
  } catch (error) {
    console.log(error);
    notification.error({
      message: 'Failed to copy Invite link',
      description: 'An error occured while copying invite link'
    });
  }
}

export default function*(): any {
  yield all([
    fork(takeLatest, actions.actionButtonClicked, determineActionSaga),
    fork(takeLatest, actions.pauseSyncConnection, disableSingleAppConnectSaga),
    fork(takeLatest, actions.getCustomersData, getCustomersDataSaga),
    fork(takeLatest, actions.postCustomerData, saveAndLinkCustomerSaga),
    fork(takeLatest, actions.fetchCustomers, fetchCustomersSaga),
    fork(takeLatest, actions.fetchCustomerAdoptions, fetchCustomerAdoptionsSaga),
    fork(takeLatest, actions.fetchCustomerUsers, fetchCustomerUsersSaga),
    fork(takeLatest, actions.fetchCustomerPlans, fetchCustomerPlansSaga),
    fork(takeLatest, actions.fetchCustomerSubscriptions, fetchCustomerSubscriptionsSaga),
    fork(takeLatest, actions.fetchCustomerDetails, fetchCustomerDetailsSaga),
    fork(takeLatest, actions.fetchCustomerRecommendations, fetchCustomerRecommendationsSaga),
    fork(takeLatest, actions.fetchCustomerAzureResources, fetchCustomerAzureResourcesSaga),
    fork(takeLatest, actions.getCustomerLoginLink, linkCustomerSaga),
    fork(takeLatest, actions.refreshOffice365, refreshOffice365Saga),
    fork(takeLatest, actions.handleConnectionFailed, handleConnectionFailedSaga),
    fork(takeLatest, actions.handleCustomerReProcess, handleCustomerReProcessSaga),
    fork(takeLatest, actions.getSecurityRecommendations, getSecurityRecommendationsSaga),
    fork(takeLatest, actions.copyCompanyInviteLink, copyCompanyInviteLinkSaga)
  ]);
}
