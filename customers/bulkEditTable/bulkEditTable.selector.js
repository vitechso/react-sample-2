import * as R from 'ramda';
import { createSelector } from 'reselect';
import { search } from '@accordo-feed/micro-frontends-utils';

import { customersDataSelector } from 'src/pages/customers/customers.selector';
import { pageSelector } from 'src/pages/pages.selector';
import {
  processDataForBulkEditTable,
  processDataForAvailableKey,
  processDataForMergedKey
} from './bulkEditTable.utils';

import { searchTermSelector } from 'src/redux/selectors';

export const bulkEditTableSelector = createSelector(pageSelector, R.prop('bulkEditTable'));

export const isCheckedSelectedSelector = createSelector(bulkEditTableSelector, R.prop('isChecked'));

export const selectedRowKeysSelector = createSelector(bulkEditTableSelector, R.prop('selectedRowKeys'));

export const bulkEditTableDataSelector = createSelector(customersDataSelector, processDataForBulkEditTable);

export const bulkEditFilteredDataSelector = createSelector(
  bulkEditTableDataSelector,
  searchTermSelector,
  (data, term) => {
    return search({ list: data, settings: ['name'] }, term);
  }
);

export const isLoadingSelector = createSelector(bulkEditTableSelector, R.prop('isLoading'));

export const dataLengthSelector = createSelector(bulkEditTableDataSelector, R.length);

export const availableDataKeySelector = createSelector(bulkEditTableDataSelector, processDataForAvailableKey);

export const mergedDataKeySelector = createSelector(bulkEditTableDataSelector, processDataForMergedKey);

export const selectedRowKeysIncludingMergedSelector = createSelector(
  selectedRowKeysSelector,
  mergedDataKeySelector,
  R.union
);

export const allAvailableKeyCountSelector = createSelector(availableDataKeySelector, R.length);
