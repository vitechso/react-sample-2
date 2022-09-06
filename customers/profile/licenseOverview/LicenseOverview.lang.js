import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genId = langHelper.genLangId('shell.aco.customers.licenseWidget');
const genOpts = langHelper.genLangOptions(genId);

export default {
  widgetTitle: genOpts('title', 'License Overview'),
  tooltipMessage: genOpts('tooltipMessage', 'Compnay license overview.'),
  licenses: genOpts('licenses', 'Licenses'),
  unassigned: genOpts('unassigned', 'Unassigned'),
  uniquePlans: genOpts('uniquePlans', 'Unique Plans'),
  misassignedLicenses: genOpts('misassigned', 'Misassigned'),
  totalSpend: genOpts('totalSpend', 'Total Spend'),
  unassignedCost: genOpts('unassignedCost', 'Unassigned Cost'),
  totalUsers: genOpts('totalUsers', 'Total Users'),
  potentialSavings: genOpts('potentialSavings', 'Potential Savings')
};
