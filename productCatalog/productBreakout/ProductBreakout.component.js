import React, { useMemo } from 'react';
import { LanguageEntry } from '@accordo-feed/language.entry';

import SimpleTable from 'src/components/simpleTable';
import lang from '../productCatalog.lang';

const tableLang = lang.table;

/*************
 *   TYPES   *
 *************/

export type Actions = {};

type Props = {
  handleRowClick: Function,
  tableData: Array<Object>
};

/*****************
 *   COMPONENT   *
 *****************/

function ProductBreakout({ tableData, handleRowClick }: Props) {
  const columns = useMemo(
    () => [
      {
        title: <LanguageEntry {...tableLang.company} />,
        className: 'aco-font-normal aco-th-font-small aco-td-font-small aco-vertical-middle',
        key: 'company',
        dataIndex: 'company'
      },
      {
        title: <LanguageEntry {...tableLang.product} />,
        className: 'aco-font-normal aco-th-font-small aco-td-font-small aco-vertical-middle',
        key: 'product',
        dataIndex: 'product'
      },
      {
        title: <LanguageEntry {...tableLang.licenses} />,
        className: 'aco-font-normal aco-th-font-small aco-td-font-small aco-vertical-middle',
        key: 'subscriptions',
        dataIndex: 'subscriptions'
      },
      {
        title: <LanguageEntry {...tableLang.priceToCustomer} />,
        className: 'aco-font-normal aco-th-font-small aco-td-font-small aco-vertical-middle',
        key: 'priceToCustomer',
        dataIndex: 'priceToCustomer'
      },
      {
        title: <LanguageEntry {...tableLang.spend} />,
        className: 'aco-font-normal aco-th-font-small aco-td-font-small aco-vertical-middle',
        children: [
          {
            title: <LanguageEntry {...tableLang.msrp} />,
            key: 'msrp',
            width: 80,
            render: record => record?.spend?.msrp
          },
          {
            title: <LanguageEntry {...tableLang.price} />,
            key: 'partnerUnitCost',
            render: record => record?.spend?.partnerUnitCost
          },
          {
            title: <LanguageEntry {...tableLang.priceToCustomer} />,
            key: 'priceToCustomerAggr',
            render: record => record?.spend?.priceToCustomer
          }
        ]
      }
    ],
    []
  );

  const tableProps = {
    columns,
    dataSource: tableData,
    pageSize: 20,
    x: 1100,
    tableHeight: 220
  };

  return (
    <SimpleTable
      {...tableProps}
      onRow={record => {
        return {
          onClick: () => handleRowClick(record.company, record.product)
        };
      }}
    />
  );
}

export default ProductBreakout;
