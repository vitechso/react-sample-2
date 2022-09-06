// @flow

import { connect } from 'react-redux';
import { redux } from '@accordo-feed/micro-frontends';

import CustomerTable from './CustomerTable.component';
import { actionButtonClicked, mergeCustomerById, handleCustomerReProcess } from 'src/pages/customers/customers.duck';
import * as selectors from 'src/redux/selectors';
import {
  setCustomerDrawerFormUpdated,
  setCustomerLoadingState
} from 'src/pages/customers/customerDrawer/customerDrawer.duck';

const { bindActionCreatorsCurried } = redux;

/*************
 *   REDUX   *
 *************/

const mapStateToProps = state => ({
  isLinking: selectors.customersIsLinkingSelector(state),
  selectedCustomerId: selectors.customerDrawerSelectedCustomerIdSelector(state)
});

const mapDispatchToProps = bindActionCreatorsCurried({
  actionButtonClicked,
  setCustomerDrawerFormUpdated,
  setCustomerLoadingState,
  mergeCustomerById,
  handleCustomerReProcess
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTable);
