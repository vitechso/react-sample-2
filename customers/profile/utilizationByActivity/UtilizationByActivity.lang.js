import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genId = langHelper.genLangId('shell.aco.dashboard.widget.departments');
const genOpts = langHelper.genLangOptions(genId);

export default {
  widgetTitle: genOpts('title', 'Application'),
  widgetSubTitle: genOpts('subTitle', 'Usage/Activity'),
  table: {
    name: genOpts('th.name', 'Name'),
    activity: genOpts('th.activity', 'Activity Score'),
    storage: genOpts('th.storage', 'Storage'),
    recommendations: genOpts('th.recommendations', 'Recommendations')
  }
};
