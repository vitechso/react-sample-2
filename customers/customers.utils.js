import * as R from 'ramda';
import bodybuilder from 'bodybuilder';
import moment from 'moment';
import { constants } from '@accordo-feed/aco-styled-components';

import { IMPACT_LEVELS } from 'src/constants';
import { pipeWhileNotNil } from 'src/utils';
import { CONNECTION_STATES, CONNECTION_TYPE, MS_AUTH_STATES, RETRY_DATA_COLLECTION_AFTER } from './customers.constants';

const { colors } = constants;

const getConnectionState = R.either(R.prop('office365Status'), R.always(CONNECTION_STATES.INACTIVE));

const hasDelegatedAccess = R.pathEq(['microsoft', 'allowDelegatedAccess'], true);

const isActive = R.pipe(getConnectionState, R.equals(CONNECTION_STATES.ACTIVE));

const isAppConnect = R.pathEq(['office365', 'connectionType'], CONNECTION_TYPE.APP_CONNECT);

const isNotAppConnect = customer => R.not(isAppConnect(customer));

const isPartnerAdmin = R.pathEq(['office365', 'connectionType'], CONNECTION_TYPE.PARTNER_ADMIN);

const hasDelegatedAccessPartnerAdmin = R.allPass([isActive, hasDelegatedAccess, isPartnerAdmin]);

const hasLinkButton = R.either(
  R.compose(
    R.not,
    R.flip(R.includes)([CONNECTION_STATES.ACTIVE, CONNECTION_STATES.IN_PROGRESS, CONNECTION_STATES.PROCESS_FAILED]),
    getConnectionState
  ),
  hasDelegatedAccessPartnerAdmin
);

const isInactive = R.either(
  R.pipe(getConnectionState, R.equals(CONNECTION_STATES.INACTIVE)),
  R.pathEq(['office365', 'authState'], MS_AUTH_STATES.NEW)
);

const isProcessFailed = R.pipe(getConnectionState, R.equals(CONNECTION_STATES.PROCESS_FAILED));

const isNeedPermissions = R.pipe(getConnectionState, R.equals(CONNECTION_STATES.NEEDS_PERMISSIONS));

const hasDelegatedAccessAppConnect = R.both(isAppConnect, hasDelegatedAccess);

const inactiveHasDelegatedAccessNotAppConnect = R.allPass([isInactive, hasDelegatedAccess, isNotAppConnect]);

const isNeedReconnect = R.both(isAppConnect, R.pathEq(['office365', 'authState'], MS_AUTH_STATES.INVALID_TOKEN));

const isConnected = customer =>
  [CONNECTION_STATES.ACTIVE, CONNECTION_STATES.NEEDS_PERMISSIONS].includes(getConnectionState(customer));

const compareByAlph = (a, b) => (a < b ? -1 : a === b ? 0 : 1);

const getCustomerById = id => R.find(R.propEq('id', id));

const getCustomerStatusById = id => pipeWhileNotNil([getCustomerById(id), getConnectionState]);

const isProcessFailedExpiry = (office365 = {}) =>
  !!office365.processFailed && moment().isAfter(moment(office365.processFailed).add(RETRY_DATA_COLLECTION_AFTER, 'ms'));

const updateCustomersById = R.curry((options, customers) => {
  const { customerOrgId, merged } = R.mergeDeepRight(
    {
      merged: {
        office365: {
          processFailed: null,
          lastProcessed: null
        }
      }
    },
    options
  );

  const oldIndex = customers.findIndex(R.propEq('id', customerOrgId));

  if (oldIndex === -1) {
    return customers;
  }

  const newCustomer = R.mergeDeepRight(customers[oldIndex], merged);

  customers.splice(oldIndex, 1, newCustomer);

  return customers;
});

const generateCustomerProcessData = orgId => customers => {
  const customer = getCustomerById(orgId)(customers);
  const customerState = R.pathOr('', ['office365', 'authState'], customer);

  if (customerState !== MS_AUTH_STATES.ACCESS_GRANTED) {
    return null;
  }

  const {
    id,
    office365: { processFailed, lastProcessed }
  } = customer;

  return { id, processFailed, lastProcessed };
};

// Optimized version of https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
const generateNewWindow = (title, width = 500, height = 500) => {
  const documentClientWidth = R.pathOr(false, ['documentElement', 'clientWidth'], document);
  const documentClientHeight = R.pathOr(false, ['documentElement', 'clientHeight'], document);
  const screenLeft = R.prop('screenLeft', window) || R.propOr(0, 'screenX', window);
  const screenTop = R.prop('screenTop', window) || R.propOr(0, 'screenY', window);
  const windowWidth = R.prop('innerWith', window) || documentClientWidth || R.pathOr(1280, ['screen', 'width'], window);
  const windowHeight =
    R.prop('innerHeight', window) || documentClientHeight || R.pathOr(720, ['screen', 'height'], window);
  const left = (windowWidth - width) / 2 + screenLeft;
  const top = (windowHeight - height) / 2 + screenTop;
  return window.open('', title, `scrollbars=yes, width=${width}, height=${height}, top=${top}, left=${left}`);
};

// Adding the loading spinner for the new window popup
const loadingNewWindow = (newWindow, title, message = 'Loading...') => {
  newWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.min.css">
      </head>
      <body>
        <div class="ant-spin-nested-loading" style="height: 100vh;">
          <div>
            <div class="ant-spin ant-spin-spinning ant-spin-show-text">
              <span class="ant-spin-dot ant-spin-dot-spin">
                <i class="ant-spin-dot-item"></i>
                <i class="ant-spin-dot-item"></i>
                <i class="ant-spin-dot-item"></i>
                <i class="ant-spin-dot-item"></i>
              </span>
            <div class="ant-spin-text" style="color: ${colors.blue}">${message}</div>
          </div>
        </div>
      </body>
    </html>
  `);
};

const generateLoadingNewWindow = (title, message = 'Loading...') => {
  const newWindow = generateNewWindow(title);
  loadingNewWindow(newWindow, title, message);
  return newWindow;
};

const redirectNewWindow = (newWindow, url) => {
  newWindow.top.location.href = url;
  if (window.focus) newWindow.focus();
};

/**
 * Helper method to identify whether a customer has been added from Partner Center
 * and their consumption document has been created as well
 *
 * @param customer
 */
const hasDelayedConsumptionInitFromPartnerCenter = R.both(
  R.hasPath(['microsoft', 'allowDelegatedAccess']),
  R.compose(R.not, R.has('office365'))
);

/**
 * Helper method to identify whether a customer is from Partner Center
 *
 * @param customer
 */
const isFromPartnerCenter = R.hasPath(['microsoft', 'allowDelegatedAccess']);

const genWorkplaceAssessmentQuery = ({ clientId, partnerId }) => ({
  queryName: 'reports-modern-workplace-assesment',
  partnerId,
  esQuery: bodybuilder()
    .filter('term', 'id', clientId)
    .filter('term', 'partnerId', partnerId)
    .build()
});

const filterByRecommendationType = (items, key) => items.filter(e => e.recommendedActions.type === key);

const getHighestImpact = groupItems => {
  const impactValues = groupItems.map(item => item.impact);

  return impactValues.some(value => value === IMPACT_LEVELS.HIGH)
    ? IMPACT_LEVELS.HIGH
    : impactValues.some(value => value === IMPACT_LEVELS.MEDIUM)
    ? IMPACT_LEVELS.MEDIUM
    : IMPACT_LEVELS.LOW;
};

export const customerUtils = {
  filterByRecommendationType,
  getConnectionState,
  getHighestImpact,
  hasLinkButton,
  isInactive,
  isProcessFailed,
  isNeedPermissions,
  isNeedReconnect,
  isAppConnect,
  isConnected,
  getCustomerById,
  getCustomerStatusById,
  hasDelegatedAccess,
  hasDelegatedAccessAppConnect,
  hasDelayedConsumptionInitFromPartnerCenter,
  isProcessFailedExpiry,
  compareByAlph,
  generateCustomerProcessData,
  updateCustomersById,
  generateLoadingNewWindow,
  redirectNewWindow,
  isFromPartnerCenter,
  hasDelegatedAccessPartnerAdmin,
  inactiveHasDelegatedAccessNotAppConnect,
  genWorkplaceAssessmentQuery
};
