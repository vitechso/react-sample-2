import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genId = langHelper.genLangId('shell.aco.customers.customerDrawer');
const genLang = langHelper.genLangOptions(genId);

export const lang = {
  customerTitle: genLang('customerTitle', 'Customer details'),
  customerName: genLang('customerName', 'Name:'),
  customerEmail: genLang('cutomerEmail', 'Email:'),
  customerTenantId: genLang('customerTenantId', 'Tenant ID:'),
  customerCountry: genLang('customerCountry', 'Country:'),
  customerType: genLang('customerType', 'Type:'),
  customerManager: genLang('customerManager', 'Account Manager:'),
  managerFullName: genLang('fullName', 'Full Name:'),
  managerAddress: genLang('emailAddress', 'Email Address:'),
  managerPhone: genLang('phoneNumber', 'Phone Number:'),
  addButton: genLang('addButton', 'Add'),
  cancelButton: genLang('cancelButton', 'Cancel'),
  licensesTitle: genLang('licensesTitle', 'Licenses ({num})'),
  connectionsTitle: genLang('connectionsTitle', 'Cloud Connections'),
  buttonO365LinkConnection: genLang('button.365linkConnection', 'Link Connection'),
  buttonO365SignIn: genLang('button.365signIn', 'O365 Sign-in'),
  buttonAzureSignIn: genLang('button.azureSignIn', 'Azure Sign-in'),
  buttonO365UpdatePermissions: genLang('button.365UpdatePermissions', 'Update Permissions'),
  azureMsg: genLang('azureMsg', 'Azure is coming soon'),
  saveButton: genLang('saveButton', 'Save changes'),
  deleteButton: genLang('deleteButton', 'Delete customer'),
  noPlanTitle: genLang('noPlanTitle', 'Licenses'),
  noPlanMessage: genLang('noPlanMessage', 'Please link the customer to get licenses information.'),
  linkFailedMessage: genLang('linkFailedMessage', 'Linking customer is failed. Please try back later.'),
  deleteCustomer: {
    deleteTitle: genLang('deleteCustomer.deleteTitle', 'Delete'),
    alertLineOne: genLang('deleteCustomer.alertLineOne', 'Caution: This cannot be undone.'),
    alertLineTwo: genLang(
      'deleteCustomer.alertLineTwo',
      'You will still be charged for this customer in the next billing cycle.'
    ),
    buttonCancel: genLang('deleteCustomer.buttonCancel', 'Cancel'),
    buttonConfirm: genLang('deleteCustomer.buttonConfirm', 'Yes, delete'),
    deleteNotice: genLang('deleteCustomer.deleteNotice', 'Customer deleted')
  }
};
