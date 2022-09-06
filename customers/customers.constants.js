export const MS_AUTH_STATES = {
  ACCESS_GRANTED: 'accessGranted',
  ACCESS_DENIED: 'accessDenied',
  AUTH_CANCELLED: 'authCancelled',
  INVALID_TOKEN: 'invalidToken',
  CALLBACK_FAILED: 'callbackFailed',
  NEW: 'new'
};

export const CONNECTION_STATES = {
  ACTIVE: 'Active',
  DENIED: 'Denied',
  AUTH_FAILED: 'Auth Failed',
  INACTIVE: 'Inactive',
  IN_PROGRESS: 'In progress',
  PROCESS_FAILED: 'Process failed',
  NEEDS_PERMISSIONS: 'Needs Permissions'
};

export const CONNECTION_STATES_LANG_MAP = {
  [CONNECTION_STATES.ACTIVE]: 'active',
  [CONNECTION_STATES.DENIED]: 'denied',
  [CONNECTION_STATES.AUTH_FAILED]: 'authFailed',
  [CONNECTION_STATES.IN_PROGRESS]: 'inProgress',
  [CONNECTION_STATES.INACTIVE]: 'inactive',
  [CONNECTION_STATES.PROCESS_FAILED]: 'processFailed',
  [CONNECTION_STATES.NEEDS_PERMISSIONS]: 'needPermissions'
};

export const RETRY_DATA_COLLECTION_AFTER = 1000 * 60 * 15;

export const CONNECTION_TYPE = {
  PARTNER_ADMIN: 'partnerAdmin',
  CUSTOMER_ADMIN: 'customerAdmin',
  APP_CONNECT: 'appConnect'
};

export const ORGANIZATION_TYPE = {
  CUSTOMER: 'Customer',
  PROSPECT: 'Prospect'
};

export const CUSTOMER_DATA_OUTDATED_THRESHOLD_HOURS = 48;
