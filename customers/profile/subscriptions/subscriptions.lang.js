import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genId = langHelper.genLangId('shell.aco.customer.widget.subscriptions');
const genOpts = langHelper.genLangOptions(genId);

export default {
  table: {
    type: genOpts('th.type', 'Type'),
    name: genOpts('th.name', 'Name'),
    term: genOpts('th.term', 'Term'),
    expiration: genOpts('th.expiration', 'Expiration'),
    renewal: genOpts('th.renewal', 'Renewal'),
    product: genOpts('th.product', 'Product'),
    seats: genOpts('th.seats', 'Seats'),
    price: genOpts('th.price', 'Price Per'),
    monthly: genOpts('th.monthly', 'Monthly'),
    annual: genOpts('th.annual', 'Annual'),
    balance: genOpts('th.balance', 'Term Balance')
  }
};
