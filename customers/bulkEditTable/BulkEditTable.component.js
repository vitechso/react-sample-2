// @flow

import React from 'react';
import * as R from 'ramda';

import SimpleTable from 'src/components/simpleTable';
import { TABLE_COLUMN_SETTINGS } from './bulkEditTable.config';
import { processDataForAvailableKey } from './bulkEditTable.utils';

/*************
 *   TYPES   *
 *************/

type ActionsType = {
  setSelectedRowKeys: Function
};

type Props = {
  actions: ActionsType,
  dataLength: number,
  companies: Array<Object>,
  loading: boolean,
  selectedRowKeys: Array<String>
};

export default ({ actions, selectedRowKeys, companies, loading }: Props) => {
  const rowSelection = {
    selectedRowKeys,
    hideDefaultSelections: true,
    hideSelectAll: true,
    onChange: (selectedRowKeys, selectedRows) => actions.setSelectedRowKeys(processDataForAvailableKey(selectedRows)),
    getCheckboxProps: record => ({
      disabled: record.merged || !record.isCustomerAvailable
    })
  };

  const isfilteredDataPresent = R.path([0, 'item'], companies) !== undefined;

  const transformedDataSource = isfilteredDataPresent
    ? companies.map(company => ({ ...company.item, refIndex: company.refIndex }))
    : companies;

  const props = {
    columns: TABLE_COLUMN_SETTINGS.CUSTOMERS,
    dataSource: transformedDataSource,
    rowSelection,
    onRow: record => ({
      className: record.isCustomerAvailable ? record.merged && 'ant-table-row-merged' : 'ant-table-row-unavailable'
    }),
    x: 980,
    tableHeight: `calc(100vh - 280px)`,
    loading
  };

  return <SimpleTable {...props} />;
};
