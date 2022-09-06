import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genAddCusId = langHelper.genLangId('shell.aco.customers.addCustomer');
const genAddCusLang = langHelper.genLangOptions(genAddCusId);

export const lang = {
  colCusType: genAddCusLang('colTitle0', 'Type'),
  colCusName: genAddCusLang('colTitle1', 'Company Name'),
  colCusEmail: genAddCusLang('colTitle2', 'Admin Email'),
  colCusTenantId: genAddCusLang('colTitle4', 'Tenant ID (optional)'),
  colCusCountry: genAddCusLang('colTitle3', 'Country'),
  colCusManager: genAddCusLang('colTitle5', 'Account Manager'),
  btnAddMore: genAddCusLang('btn1', 'add more'),
  btnDelete: genAddCusLang('btn2', 'Delete'),
  btnSave: genAddCusLang('btn3', 'Save'),
  btnSaveLink: genAddCusLang('btn4', 'Save & Link'),
  errors: {
    noName: genAddCusLang('errors.e1', 'Please enter a name'),
    tooLongName: genAddCusLang('errors.e2', 'Name is too long'),
    invalideEmail: genAddCusLang('errors.e4', 'Please enter valid email address'),
    noCountry: genAddCusLang('errors.e5', 'Please select a country'),
    noOrganizationType: genAddCusLang('errors.e6', 'Please select a type')
  }
};
