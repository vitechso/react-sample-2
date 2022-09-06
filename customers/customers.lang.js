import { langHelper } from '@accordo-feed/micro-frontends-utils';

import { CONNECTION_STATES } from './customers.constants';

const genCusTableId = langHelper.genLangId('shell.aco.customers.customerTable');
const genCusTableIdV2 = langHelper.genLangId('shell.aco.customers.customerTable.v2');
const genCusTableLang = langHelper.genLangOptions(genCusTableId);
const genCusTableLangV2 = langHelper.genLangOptions(genCusTableIdV2);
const genFilterId = langHelper.genLangId('shell.aco.customers.customerFilter');
const genFilterLang = langHelper.genLangOptions(genFilterId);

export const lang = {
  filter: {
    type: genFilterLang('customerType', 'Company Type'),
    status: genFilterLang('connectionStatus', 'Connection Status')
  },
  table: {
    tableTitle: genCusTableLang('heading', 'Customer management'),
    tablePageTitleNew: genCusTableLang('heading2', 'Partner Center Connection'),
    tableTitleNew: genCusTableLang('heading2', 'Company Management'),
    btnAddCus: genCusTableLang('btn', 'Add Company'),
    searchBarPlaceholder: genCusTableLang('searchBarPlaceholder', 'Search by company & account manager'),
    btnDownloadRpt: genCusTableLang('btn2', 'Download report'),
    colCompanyInfo: genCusTableLang('colTitleCompanyInfo', 'Company Info'),
    colCompanyType: genCusTableLang('colTitleCompanyType', 'Type'),
    colCompName: genCusTableLang('colTitle1', 'Company'),
    colCompManager: genCusTableLang('colTitle0', 'Account Manager'),
    colLicenseCnt: genCusTableLang('colTitle', 'Active users'),
    colSecureScore: genCusTableLang('colTitle', 'Azure tenants'),
    colLicencesTotal: genCusTableLang('colTitle2', 'Total Licences'),
    colLicencesAval: genCusTableLang('colTitle3', 'Available Licences'),
    colUsers: genCusTableLang('colTitle4', 'Visit Connection'),
    colConnectStatus: genCusTableLang('colTitle5', 'Connection status'),
    colLinkConnection: genCusTableLang('colTitle6', 'Link Connection'),
    colUsersV2: genCusTableLangV2('colTitle2', 'Users'),
    colLicenseCntV2: genCusTableLangV2('colTitle3', 'License Count'),
    colConnectStatusV2: genCusTableLangV2('colTitle5', 'Connection Status'),
    colLatestSyncV2: genCusTableLangV2('colTitle12', 'Latest Sync'),
    colAssessments: genCusTableLangV2('colTitle13', 'Assessments'),
    colConnectionTypeV2: genCusTableLangV2('colTitle7', 'Connection type'),
    colLinkConnectionV2: genCusTableLangV2('colTitle8', 'Link Cloud Connection'),
    colResources: genCusTableLang('colTitle9', 'Resources'),
    colBudget: genCusTableLang('colTitle10', 'Budget'),
    colActual: genCusTableLang('colTitle11', 'Actual'),
    btnLinkConnection: genCusTableLang('btn3', 'Link connection'),
    btnReProcess: genCusTableLang('btn4', 'Retry Process'),
    btnUpdatePermissions: genCusTableLang('btn5', 'Update Permissions'),
    btnSyncClientData: genCusTableLang('btn6', 'Sync Client Data'),
    btnReconnect: genCusTableLang('btn7', 'Reconnect'),
    countDownTitle: genCusTableLang('countDownTitle', 'Retrying...'),
    btnOneOffImport: genCusTableLang('fastActivation', 'One-off Import'),
    btnEnableRefresh: genCusTableLang('enableRefresh', 'Enable Refresh'),
    activelyConnected: genCusTableLang('activelyConnected', '{count} Actively connected'),
    total: genCusTableLang('total', 'Total {count}'),
    tooltip: {
      colLicencesTotal: genCusTableLang('tooltip.colLicencesTotal', 'Total Licences'),
      colLicencesAval: genCusTableLang('tooltip.colLicencesAval', 'Available Licences'),
      colTotalSpend: genCusTableLang('tooltip.colTotalSpend', 'Total spend')
    },
    authState: {
      active: genCusTableLang('active', CONNECTION_STATES.ACTIVE),
      denied: genCusTableLang('denied', CONNECTION_STATES.DENIED),
      inactive: genCusTableLang('inactive', CONNECTION_STATES.INACTIVE),
      authFailed: genCusTableLang('authFailed', CONNECTION_STATES.AUTH_FAILED),
      inProgress: genCusTableLang('inProgress', CONNECTION_STATES.IN_PROGRESS),
      processFailed: genCusTableLang('processFailed', CONNECTION_STATES.PROCESS_FAILED),
      needPermissions: genCusTableLang('needPermissions', CONNECTION_STATES.NEEDS_PERMISSIONS)
    },
    footer: {
      viewing: genCusTableLang('footer.p1', 'Viewing'),
      cus: genCusTableLang('footer.p2', 'customers')
    },
    filter: {
      optAll: genCusTableLang('filter.opt1', 'All'),
      optActive: genCusTableLang('filter.opt2', 'Active'),
      optDenied: genCusTableLang('filter.opt3', 'Denied'),
      optAuthFailed: genCusTableLang('filter.opt4', 'Authentication failed'),
      optInactive: genCusTableLang('filter.opt5', 'Inactive')
    },
    totalPermissionWarnings: genCusTableLang(
      'totalPermissionWarnings',
      'There are {oldPermissionCount} customers that need updated permissions'
    ),
    permissionOverlay: genCusTableLang('permissionOverlay', 'Permissions update required to see the Secure Score.'),
    fastActivationOverlay: genCusTableLang(
      'fastActivationOverlay',
      'Has delegated access. Easy login with your Partner Center credentials.'
    ),
    timeAgo: genCusTableLang('timeAgo', '{time} ago'),
    partnerAdmin: genCusTableLang('oneOff', 'One-off'),
    customerAdmin: genCusTableLang('daily', 'Daily'),
    appConnect: genCusTableLang('daily', 'Daily')
  },
  connectionModal: {
    title: genCusTableLang('connectionModal.title', 'Link cloud connections'),
    o365Button: genCusTableLang('connectionModal.o365Button', 'O365 Sign-in'),
    azureButton: genCusTableLang('connectionModal.azureButton', 'Azure Sign-in'),
    awsButton: genCusTableLang('connectionModal.awsButton', 'AWS Sign-in'),
    footer: genCusTableLang('connectionModal.footer', 'Coming soon')
  }
};
