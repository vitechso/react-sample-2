// @flow

import * as R from 'ramda';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { redux } from '@accordo-feed/micro-frontends';

import * as selectors from './syncCustomersMessage.selector';
import SyncCustomersMessage from './SyncCustomersMessage.component';
import { resetSyncCustomersMessageSettings } from 'src/pages/customers/customers.duck';

const { bindActionCreatorsCurried } = redux;

/*************
 *   REDUX   *
 *************/

const mapStateToProps = R.applySpec({
  syncCustomersNum: selectors.syncCustomersNumSelector,
  isCustomersSynced: selectors.isCustomersSyncedSelector,
  isShowSyncCustomersMessage: selectors.isShowUpdateCustomersMessageSelector,
  syncCustomersTimeoutId: selectors.syncCustomersTimeoutIdSelector
});

const mapDispatchToProps = bindActionCreatorsCurried({
  resetSyncCustomersMessageSettings
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(SyncCustomersMessage);
