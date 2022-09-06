// @flow

import { core } from '@accordo-feed/micro-frontends-utils';

import type { CustomerDataType } from './customers.duck';
import { API } from 'src/utils/api';
import { resolveApiEndpoint, requestHandler, getElasticData } from 'src/utils';

/*************
 *   TYPES   *
 *************/

type CustomerConsumptionStateType = {
  authState: string,
  lastProcessed: string
};

type CustomerMSLoginType = {
  url: string
};

/*****************
 *   API CALLS   *
 *****************/

const customersDataApi = resolveApiEndpoint(API.GET_CUSTOMERS);
const customerCreateApi = resolveApiEndpoint(API.POST_CUSTOMER);
const customerDeleteApi = resolveApiEndpoint(API.DELETE_CUSTOMER);
const customerUpdateApi = resolveApiEndpoint(API.PUT_CUSTOMER);
const customerInitConsumption = resolveApiEndpoint(API.GET_CUSTOMER_STATE);
const customerGetLoginUrl = resolveApiEndpoint(API.GET_CUSTOMER_LOGIN);
const refreshOffice365Url = resolveApiEndpoint(API.REFRESH_OFFICE365);
const customerAdoptionsUrl = resolveApiEndpoint(API.GET_CUSTOMER_ADOPTION);
const customerUsersUrl = resolveApiEndpoint(API.GET_CUSTOMER_USERS);
const customerDashboardUrl = resolveApiEndpoint(API.GET_CUSTOMER_DASHBOARD);
const customerRecommendationsUrl = resolveApiEndpoint(API.GET_CUSTOMER_RECOMMENDATIONS);
const customerAzureResourcesUrl = resolveApiEndpoint(API.GET_CUSTOMER_AZURE_RESOURCES);
const enableSingleAppConnectUrl = resolveApiEndpoint(API.ENABLE_SINGLE_APP_CONNECT);
const disableSingleAppConnectUrl = resolveApiEndpoint(API.DISABLE_SINGLE_APP_CONNECT);
const modernWorkplaceAssessmentApi = resolveApiEndpoint(API.GET_MODERN_WORKPLACE_ASSESSMENT);

export const getCustomersData = (orgId: string): Promise<CustomerDataType> =>
  requestHandler({
    url: core.replaceAll(customersDataApi, { orgId })
  });

export const postCustomerData = ({ orgId, data }: { orgId: string, data: Array<string> }): Promise<CustomerDataType> =>
  requestHandler({
    method: 'POST',
    url: core.replaceAll(customerCreateApi, { orgId }),
    data
  });

export const deleteCustomer = (orgId: string) =>
  requestHandler({
    method: 'DELETE',
    url: core.replaceAll(customerDeleteApi, { orgId })
  });

export const putCustomerData = ({ orgId, data }: { orgId: string, data: Array<string> }): Promise<CustomerDataType> =>
  requestHandler({
    method: 'PUT',
    url: core.replaceAll(customerUpdateApi, { orgId }),
    data
  });

export const getCustomerState = (orgId: string): Promise<CustomerConsumptionStateType> =>
  requestHandler({
    url: core.replaceAll(customerInitConsumption, { orgId })
  });

export const getCustomerLogin = (orgId: string): Promise<CustomerMSLoginType> =>
  requestHandler({
    url: core.replaceAll(customerGetLoginUrl, { orgId })
  });

export const refreshOffice365 = (orgId: string) =>
  requestHandler({
    method: 'POST',
    url: core.replaceAll(refreshOffice365Url, { orgId })
  });

export const getCustomerAdoptions = (orgId: string) =>
  requestHandler({
    url: core.replaceAll(customerAdoptionsUrl, { orgId })
  });

export const getCustomerUsers = (orgId: string) =>
  requestHandler({
    url: core.replaceAll(customerUsersUrl, { orgId })
  });

export const getCustomerDashboard = (orgId: string) =>
  requestHandler({
    url: core.replaceAll(customerDashboardUrl, { orgId })
  });

export const getCustomerRecommendations = (orgId: string) =>
  requestHandler({
    url: core.replaceAll(customerRecommendationsUrl, { orgId })
  });

export const getCustomerAzureResources = ({ orgId, partnerId }: { orgId: string, partnerId: string }) =>
  requestHandler({
    url: core.replaceAll(customerAzureResourcesUrl, { orgId, partnerId })
  });

export const enableSingleAppConnect = (orgId: string) =>
  requestHandler({
    method: 'PUT',
    url: core.replaceAll(enableSingleAppConnectUrl, { orgId })
  });

export const disableSingleAppConnect = (orgId: string) =>
  requestHandler({
    method: 'PUT',
    url: core.replaceAll(disableSingleAppConnectUrl, { orgId })
  });

export const getModernWorkplaceAssessment = (data: Object) =>
  getElasticData({ data, apiUrl: modernWorkplaceAssessmentApi });
