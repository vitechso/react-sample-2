import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genId = langHelper.genLangId('shell.aco.productCatalog');
const genOpts = langHelper.genLangOptions(genId);

export default {
  pageTitle: genOpts('title', 'Product Catalog'),
  table: {
    company: genOpts('th.company', 'Company'),
    product: genOpts('th.product', 'Product'),
    licenses: genOpts('th.licenses', 'Licenses'),
    priceToCustomer: genOpts('th.priceToCustomer', 'Price To Customer'),
    plans: genOpts('th.plans', 'Unique Plans'),
    msrp: genOpts('th.msrp', 'MSRP'),
    price: genOpts('th.partnerUnitCost', 'Partner Unit Cost'),
    spend: genOpts('th.spend', 'Spend')
  }
};
