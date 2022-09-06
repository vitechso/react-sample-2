import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genId = langHelper.genLangId('shell.aco.customers.customerTable.header');
const genOpts = langHelper.genLangOptions(genId);

export default {
  title: genOpts('title', 'Partner Center'),
  info: genOpts('info', 'Automate the import of your customers by Integrating your Partners Center into Entori.'),
  numberOfCustomers: genOpts('numberOfCustomers', 'Client list import - {count} users'),
  numberOfAppConnectCustomers: genOpts('numberOfAppConnectCustomers', 'Secure App Connect(PowerShell) - {count} users'),
  connected: genOpts('connected', 'Connected'),
  failed: genOpts('failed', 'Failed connection'),
  updated: genOpts('updated', 'Updated {time} ago'),
  connect: genOpts('connect', 'Connect'),
  connecting: genOpts('connecting', 'Connecting...'),
  disconnect: genOpts('disconnect', 'Disconnect'),
  reconnect: genOpts('reconnect', 'Reconnect'),
  disconnectPC: genOpts('disconnectPC', 'Disconnect Partner Center'),
  disconnectWarning: genOpts(
    'disconnectWarning',
    'Your Partner Center will be  Disconnected . No data will be deleted from your account. Your daily updates will be discontinued.'
  ),
  confirmDisconnect: genOpts('confirmDisconnect', 'Yes, Disconnect'),
  cancel: genOpts('cancel', 'Cancel'),
  disconnectedSuccessfully: genOpts('disconnectedSuccessfully', 'Disconnected successfully')
};
