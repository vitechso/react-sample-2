import * as R from 'ramda';
import { createSelector } from 'reselect';

import { getArrayTotal } from 'src/utils';
import { getModuleSelector } from 'src/redux/utils';
import { customerUtils } from 'src/pages/customers/customers.utils';
import { customersDataSelector } from 'src/pages/customers/customers.selector';

const moduleSelector = getModuleSelector('customerDrawer');

export const customerDrawerIsFormUpdatedSelector = createSelector(moduleSelector, module => module.isFormUpdated);

export const customerDrawerIsCustomerUpdatingSelector = createSelector(
  moduleSelector,
  module => module.isCustomerUpdating
);

export const customerDrawerCustomerSelector = createSelector(moduleSelector, customer => customer.data);

export const customerDrawerIsLoadingSelector = createSelector(moduleSelector, module => module.isLoading);

export const customerDrawerCustomerDeletedStateSelector = createSelector(
  moduleSelector,
  module => module.customerDeletedState
);

export const customerDrawerPlansSelector = createSelector(moduleSelector, module => module.plans);

export const customerDrawerPlansTotalSelector = createSelector(customerDrawerPlansSelector, plans =>
  getArrayTotal('purchased')(plans)
);

export const customerDrawerCustomerLinkedSelector = createSelector(moduleSelector, module => module.isCustomerLinked);

export const customerDrawerSelectedCustomerIdSelector = createSelector(
  moduleSelector,
  module => module.selectedCustomerId
);

export const hasConsumptionDocInitDelaySelector = createSelector(
  customersDataSelector,
  customerDrawerCustomerSelector,
  (customers, customer) => {
    if (!R.isEmpty(customer)) {
      const fullCustomer = customerUtils.getCustomerById(customer.id)(customers);
      return customerUtils.hasDelayedConsumptionInitFromPartnerCenter(fullCustomer);
    }
    return true;
  }
);
