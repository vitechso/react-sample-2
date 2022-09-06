// @flow

import * as R from 'ramda';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { redux } from '@accordo-feed/micro-frontends';

import * as selectors from 'src/redux/modules/partnerCenter/partnerCenter.selector';
import CustomerHeader from './CustomerHeader.component';
import { connectPartnerCenter } from 'src/redux/modules/partnerCenter/partnerCenter.duck';
import { loaderInlineHOC } from 'src/hoc';

/*************
 *   REDUX   *
 *************/

const mapStateToProps = R.applySpec({
  isConnected: selectors.isConnectedSelector,
  isFailedConnected: selectors.isFailedConnectedSelector,
  isLoading: selectors.isLoadingSelector,
  isSecureApp: selectors.isSecureAppConnectionTypeSelector,
  lastUpdated: selectors.lastTriggeredSelector,
  totalPartnerCenterCustomers: selectors.totalPartnerCenterCustomersSelector
});

const mapDispatchToProps = redux.bindActionCreatorsCurried({
  connectPartnerCenter
});

export default compose(connect(mapStateToProps, mapDispatchToProps), loaderInlineHOC())(CustomerHeader);
