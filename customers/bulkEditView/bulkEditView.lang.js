import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genBulkEditViewId = langHelper.genLangId('shell.aco.customers.bulkEditView');
const genBulkEditViewLang = langHelper.genLangOptions(genBulkEditViewId);

export default {
  syncButton: genBulkEditViewLang('syncButton', 'Sync Client Data'),
  cancelButton: genBulkEditViewLang('cancelButton', 'Not now'),
  header: genBulkEditViewLang('header', '{amount} Selected with Delegated Access / Total {total}'),
  table: {
    colCusName: genBulkEditViewLang('table.colCusName', 'Company'),
    colConnectionType: genBulkEditViewLang('table.colConnectionType', 'Connection Type'),
    colDelegatedAccess: genBulkEditViewLang('table.colDelegatedAccess', 'Delegated Access Granted'),
    searchBarPlaceholder: genBulkEditViewLang('searchBarPlaceholder', 'Search')
  }
};
