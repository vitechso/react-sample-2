import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genId = langHelper.genLangId('shell.aco.customers.customerTable.connectDropdown');
const genOpts = langHelper.genLangOptions(genId);

export default {
  appSetup: genOpts('secureAppSetup', 'Secure App Setup'),
  reconfigureApp: genOpts('reconfigureApp', 'Reconfigure Secure App'),
  importCompanies: genOpts('importCompanies', 'Import Companies'),
  editCompanies: genOpts('editCompanies', 'Edit Company List'),
  helpDocs: genOpts('helpDocs', 'Online Help Doc')
};
