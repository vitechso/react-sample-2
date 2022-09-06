import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genId = langHelper.genLangId('shell.aco.dashboard.widget.departments');
const genOpts = langHelper.genLangOptions(genId);

export default {
  widgetTitle: genOpts('title', 'Departments'),
  table: {
    name: genOpts('th.name', 'Name'),
    users: genOpts('th.users', 'Users'),
    plans: genOpts('th.plans', 'Plans'),
    annual: genOpts('th.annual', 'Annual Spend')
  }
};
