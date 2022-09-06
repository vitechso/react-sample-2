import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genSyncCustomersMessageId = langHelper.genLangId('shell.aco.customers.syncCustomersMessage');
const genSyncCustomersMessageLang = langHelper.genLangOptions(genSyncCustomersMessageId);

export default {
  syncingCustomerText: genSyncCustomersMessageLang('syncingCustomerText', 'Importing {count} client'),
  syncingCustomersText: genSyncCustomersMessageLang('syncingCustomersText', 'Importing {count} clients'),
  syncedCustomersText: genSyncCustomersMessageLang('syncedCustomersText', '{count} clients Imported successfully')
};
