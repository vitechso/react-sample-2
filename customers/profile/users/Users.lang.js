import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genId = langHelper.genLangId('shell.aco.dashboard.widget.users');
const genOpts = langHelper.genLangOptions(genId);

export default {
  table: {
    status: genOpts('th.status', 'Status'),
    user: genOpts('th.user', 'Name'),
    contact: genOpts('th.contact', 'Email Address'),
    department: genOpts('th.department', 'Department'),
    plans: genOpts('th.plans', 'Subscriptions'),
    costs: genOpts('th.costs', 'Costs/Month'),
    storage: genOpts('th.storage', 'OneDrive Storage Used'),
    activity: genOpts('th.activity', 'Last Activity')
  },
  tooltip: {
    accountEnabled: genOpts('accountEnabled', 'User has access to Azure Active Directory'),
    accountDisabled: genOpts('accountDisabled', 'User does not have access to Azure Active Directory'),
    oneDriveStorageUsed: genOpts(
      'oneDriveStorageUsed',
      'Total OneDrive storage used by user. This level of data is only accessible if anonymized user usage reporting is disabled in the customers tenant. Follow instructions <a target="_blank" href="https://docs.microsoft.com/en-us/office365/troubleshoot/miscellaneous/reports-show-anonymous-user-name">here</a> to enable more granular reporting.'
    ),
    lastActivity: genOpts(
      'lastActivity',
      'Users last activity date based on activity in the following applications: Exchange, OneDrive, SharePoint, Skype For Business, Yammer, Teams, Office. This level of data is only accessible if anonymized user usage reporting is disabled in the customers tenant. Follow instructions <a target="_blank" href="https://docs.microsoft.com/en-us/office365/troubleshoot/miscellaneous/reports-show-anonymous-user-name">here</a> to enable more granular reporting.'
    )
  }
};
