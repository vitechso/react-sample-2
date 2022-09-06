import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genId = langHelper.genLangId('shell.aco.dashboard.widget.departments');
const genOpts = langHelper.genLangOptions(genId);

export default {
  widgetTitle: genOpts('title', 'Application'),
  widgetSubTitle: genOpts('subTitle', 'Last Login'),
  table: {
    name: genOpts('th.name', 'Name'),
    recent: genOpts('th.recent', 'Recent (<30 days)'),
    lessActive: genOpts('th.lessActive', 'Less Active (>30<60 days)'),
    inactive: genOpts('th.inactive', 'Inactive')
  }
};
