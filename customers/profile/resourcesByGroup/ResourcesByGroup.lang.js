import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genId = langHelper.genLangId('shell.aco.customer.widget.subscriptions');
const genOpts = langHelper.genLangOptions(genId);

export default {
  table: {
    group: genOpts('th.group', 'Group'),
    resources: genOpts('th.resources', 'Resources'),
    estimateCost: genOpts('th.estimateCost', 'Estimate Cost'),
    percentOfTotalCost: genOpts('th.percentOfTotalCost', '% of Total Cost')
  }
};
