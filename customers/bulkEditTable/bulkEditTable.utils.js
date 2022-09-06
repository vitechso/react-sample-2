import * as R from 'ramda';

import { MS_AUTH_STATES, CONNECTION_TYPE, ORGANIZATION_TYPE } from 'src/pages/customers/customers.constants';

// Check if customer is appConnect and has delegate access
const isCustomerAvailable = item =>
  R.pathOr(false, ['microsoft', 'allowDelegatedAccess'], item) &&
  R.path(['office365', 'connectionType'], item) === CONNECTION_TYPE.APP_CONNECT;

const filterForAvailableKey = item => item.isCustomerAvailable && item.merged !== undefined && !item.merged;

const filterForMergedKey = item => item.isCustomerAvailable && item.merged;

const pickFilterDataKey = R.prop('key');

const restructureCustomerData = item => {
  const result = {
    id: item.id,
    key: item.id,
    name: item.name,
    microsoft: item.microsoft,
    isCustomerAvailable: isCustomerAvailable(item),
    merged: false,
    connectionType: item.office365?.connectionType,
    delegatedAccess: item.microsoft?.allowDelegatedAccess,
    organizationType: item.organizationType
  };
  if (R.path(['office365', 'authState'], item) === MS_AUTH_STATES.ACCESS_GRANTED) {
    result.merged = true;
  }
  return result;
};

const sortCustomerNameAscending = R.ascend(R.prop('name'));

// Restructure customer data for table and define merge state
export const processDataForBulkEditTable = data => {
  const restructuredData = R.sort(sortCustomerNameAscending, R.map(restructureCustomerData, data));
  const customerData = R.filter(
    item => item.organizationType === ORGANIZATION_TYPE.CUSTOMER && item.microsoft && item.connectionType,
    restructuredData
  );

  return customerData;
};

// Get all available keys(customers) can be selected
export const processDataForAvailableKey = data => R.map(pickFilterDataKey, R.filter(filterForAvailableKey, data));

// Get all merged keys(customers)
export const processDataForMergedKey = data => R.map(pickFilterDataKey, R.filter(filterForMergedKey, data));
