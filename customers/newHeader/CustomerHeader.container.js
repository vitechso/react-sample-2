// @flow

import * as R from 'ramda';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { redux } from '@accordo-feed/micro-frontends';

import * as selectors from 'src/redux/modules/partnerCenter/partnerCenter.selector';
import * as dashboardSelectors from 'src/redux/selectors';
import CustomerHeader from './CustomerHeader.component';
import withDashboardData from 'src/hoc/withDashboardDataHOC';
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
  totalPartnerCenterCustomers: selectors.totalPartnerCenterCustomersSelector,
  summary: dashboardSelectors.dashboardSummarySelector
});

const mapDispatchToProps = redux.bindActionCreatorsCurried({
  connectPartnerCenter
});

export default compose(
  withDashboardData(),
  connect(mapStateToProps, mapDispatchToProps),
  loaderInlineHOC()
)(CustomerHeader);
