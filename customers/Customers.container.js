// @flow

import * as R from 'ramda';
import React, { useEffect } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { redux } from '@accordo-feed/micro-frontends';

import { formatCurrencyHOC, widgetDataHOC } from 'src/hoc';
import { setSearchTerm } from 'src/redux/modules/searchTerm/searchTerm.duck';
import { showErrorToaster } from 'src/redux/modules/errorModal/errorModal.duck';
import * as selectors from 'src/redux/selectors';
import * as bulkEditTableSelectors from './bulkEditTable/bulkEditTable.selector';
import * as customersSelectors from './customers.selector';
import CustomersComponent from './Customers.component';
import {
  deleteCustomer,
  setCustomerDeletedState,
  setCustomerDrawerFormUpdated,
  setCustomerLoadingState,
  setSelectedCustomerId,
  resetCustomer,
  getCustomerSuccess
} from './customerDrawer/customerDrawer.duck';
import {
  actionButtonClicked,
  copyCompanyInviteLink,
  handleCustomerReProcess,
  mergeCustomerById,
  setAddDialogOpened,
  refreshOffice365,
  pauseSyncConnection
} from './customers.duck';

const { bindActionCreatorsCurried } = redux;

/*****************
 *   COMPONENT   *
 *****************/

const Customers = props => {
  useEffect(() => {
    return () => {
      props.actions.resetCustomer();
    };
  }, []);

  return <CustomersComponent {...props} />;
};

/*************
 *   REDUX   *
 *************/

const mapStateToProps = R.applySpec({
  bulkEditData: bulkEditTableSelectors.bulkEditTableDataSelector,
  customerDeletedState: selectors.customerDrawerCustomerDeletedStateSelector,
  customers: selectors.customersFilteredDataSelector,
  isBulkEditView: customersSelectors.bulkEditViewSelector,
  isLoading: selectors.customersIsLoadingSelector,
  searchTerm: selectors.searchTermSelector,
  selectedCustomerId: selectors.customerDrawerSelectedCustomerIdSelector
});

const mapDispatchToProps = bindActionCreatorsCurried({
  resetCustomer,
  deleteCustomer,
  setAddDialogOpened,
  setCustomerDeletedState,
  setSearchTerm,
  actionButtonClicked,
  pauseSyncConnection,
  refreshOffice365,
  mergeCustomerById,
  handleCustomerReProcess,
  setSelectedCustomerId,
  setCustomerDrawerFormUpdated,
  setCustomerLoadingState,
  copyCompanyInviteLink,
  getCustomerSuccess,
  showErrorToaster
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  formatCurrencyHOC,
  widgetDataHOC(['customers'])
)(Customers);
