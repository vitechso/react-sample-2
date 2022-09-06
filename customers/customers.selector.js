import * as R from 'ramda';
import moment from 'moment';
import { createSelector } from 'reselect';
import { search } from '@accordo-feed/micro-frontends-utils';

import { getModuleSelector } from 'src/redux/utils';
import { searchTermSelector } from 'src/redux/selectors/searchTerm';

export const customersSelector = getModuleSelector('customers');

export const customersDataSelector = createSelector(customersSelector, R.prop('data'));

export const customersAccountManagersSelector = createSelector(customersSelector, R.prop('accountManagers'));

export const customersFilteredDataSelector = createSelector(customersDataSelector, searchTermSelector, (list, term) =>
  search({ list, settings: ['name', 'accountManager.fullName'] }, term)
);

export const customersIsLoadingSelector = createSelector(customersSelector, R.prop('isLoading'));

export const customersIsLoadedSelector = createSelector(customersSelector, R.prop('isLoaded'));

export const customersIsLinkingSelector = createSelector(customersSelector, R.prop('isLinking'));

export const customersIsAddingCustomerSelector = createSelector(customersSelector, R.prop('isAddDialogOpened'));

export const customersProcessingListSelector = createSelector(customersSelector, R.prop('processingCustomers'));

export const bulkEditViewSelector = createSelector(customersSelector, R.prop('bulkEditView'));

export const showSecureAppModalSelector = createSelector(customersSelector, R.prop('showSecureAppModal'));

export const clientsWithOldDataSelector = createSelector(
  customersDataSelector,
  R.filter(
    R.pipe(
      R.either(R.path(['office365', 'lastProcessed']), R.prop('lastUpdated')),
      timestamp => timestamp && moment(timestamp).isBefore(moment().subtract(2, 'days'))
    )
  )
);

export const hasClientsWithOldDataSelector = createSelector(
  clientsWithOldDataSelector,
  R.propSatisfies(x => x > 0, 'length')
);

export const drawerClientIdSelector = createSelector(customersSelector, R.prop('drawerClientId'));

export const clientDataSelector = createSelector(customersSelector, R.prop('clientData'));
