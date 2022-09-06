// @flow

import * as R from 'ramda';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { translateHOC } from '@accordo-feed/language.entry';
import { redux } from '@accordo-feed/micro-frontends';

import * as selectors from 'src/redux/selectors';
import CustomerDrawer from './CustomerDrawer.component';
import {
  getCustomer,
  resetCustomer,
  setCustomerDrawerFormUpdated,
  deleteCustomer,
  setCustomerDeletedState,
  updateCustomer
} from './customerDrawer.duck';
import { CUSTOMER_DELETED_STATES } from './customerDrawer.constants';

import { getCustomerLoginLink, setCustomerManagers } from 'src/pages/customers/customers.duck';

const { bindActionCreatorsCurried } = redux;

/*************
 *   REDUX   *
 *************/

const mapStateToProps = state => ({
  selectedCustomerId: selectors.customerDrawerSelectedCustomerIdSelector(state),
  customer: selectors.customerDrawerCustomerSelector(state),
  accountManagers: selectors.customersAccountManagersSelector(state),
  isLoading: selectors.customerDrawerIsLoadingSelector(state),
  isFormUpdated: selectors.customerDrawerIsFormUpdatedSelector(state),
  customerDeletedState: selectors.customerDrawerCustomerDeletedStateSelector(state),
  isCustomerUpdating: selectors.customerDrawerIsCustomerUpdatingSelector(state),
  plans: selectors.customerDrawerPlansSelector(state),
  plansTotal: selectors.customerDrawerPlansTotalSelector(state),
  isLinked: selectors.customerDrawerCustomerLinkedSelector(state),
  customers: selectors.customersDataSelector(state),
  hasInitDelay: selectors.hasConsumptionDocInitDelaySelector(state)
});

const mapDispatchToProps = bindActionCreatorsCurried({
  getCustomer,
  resetCustomer,
  setCustomerDrawerFormUpdated,
  deleteCustomer,
  setCustomerDeletedState,
  setCustomerManagers,
  updateCustomer,
  getCustomerLoginLink
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),

  withProps(props => {
    const { actions, selectedCustomerId, customer } = props;

    return {
      onClose: () => {
        actions.setCustomerDrawerFormUpdated(false);
        actions.resetCustomer();
      },

      onSubmit: R.pipe(
        // $FlowIgnore
        R.pick(['name', 'email', 'countryCode', 'organizationType', 'accountManager', 'microsoft']),
        actions.updateCustomer
      ),

      onFormValueChange: () => {
        actions.setCustomerDrawerFormUpdated(true);
      },

      onDeleteClose: () => {
        actions.setCustomerDeletedState(CUSTOMER_DELETED_STATES.HIDE);
        actions.resetCustomer();
      },

      onNeedConfirmDelete: () => {
        actions.setCustomerDeletedState(CUSTOMER_DELETED_STATES.NEED_CONFIRM);
      },

      onConfirmDelete: actions.deleteCustomer,

      onClickLinkCustomer: e => {
        e.preventDefault();
        actions.getCustomerLoginLink(customer);
      },

      onUpdateCustomerManagers: actions.setCustomerManagers,

      afterVisibleChange: visible => {
        if (visible) {
          actions.getCustomer(selectedCustomerId);
        }
      }
    };
  }),

  translateHOC
)(CustomerDrawer);
