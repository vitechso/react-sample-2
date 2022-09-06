import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genId = langHelper.genLangId('shell.aco.dashboard.widget.departments');
const genOpts = langHelper.genLangOptions(genId);

export default {
  table: {
    application: genOpts('th.application', 'Application'),
    version: genOpts('th.version', 'Version'),
    deviceCount: genOpts('th.deviceCount', 'Device Count'),
    appSize: genOpts('th.appSize', 'App Size')
  }
};
