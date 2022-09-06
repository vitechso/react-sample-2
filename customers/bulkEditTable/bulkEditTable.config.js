import React from 'react';
import { LanguageEntry } from '@accordo-feed/language.entry';

import lang from 'src/pages/customers/bulkEditView/bulkEditView.lang';
import { sortByAlph } from 'src/utils';

const { table } = lang;

const COL_MAP = {
  CUSTOMERS: {
    COL_NAME: {
      title: <LanguageEntry {...table.colCusName} />,
      className: 'aco-vertical-middle',
      dataIndex: 'name',
      sorter: sortByAlph('name')
    },
    COL_CONNECTION_TYPE: {
      title: <LanguageEntry {...table.colConnectionType} />,
      className: 'aco-vertical-middle',
      dataIndex: 'connectionType',
      sorter: sortByAlph('connectionType')
    },
    COL_DELEGATED_ACCESS: {
      title: <LanguageEntry {...table.colDelegatedAccess} />,
      className: 'aco-vertical-middle',
      dataIndex: 'delegatedAccess',
      render: delegatedAccess => (delegatedAccess ? 'True' : 'False'),
      sorter: (a, b) => (a.delegatedAccess ? 1 : 0) - (b.delegatedAccess ? 1 : 0)
    }
  }
};

export const TABLE_COLUMN_SETTINGS = {
  CUSTOMERS: [COL_MAP.CUSTOMERS.COL_NAME, COL_MAP.CUSTOMERS.COL_CONNECTION_TYPE, COL_MAP.CUSTOMERS.COL_DELEGATED_ACCESS]
};
