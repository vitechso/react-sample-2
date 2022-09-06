import React from 'react';
import { LanguageEntry } from '@accordo-feed/language.entry';

import { renderSpend } from 'src/pages/masterList/masterList.config';
import { sortByAlph, sortByNumber } from 'src/utils';
import lang from './ResourcesByGroup.lang';

export const generateTableColumns = ({ enableSort }) => [
  {
    title: <LanguageEntry {...lang.table.group} />,
    dataIndex: 'resourceGroupName',
    key: 'resourceGroupName',
    sorter: enableSort && sortByAlph('resourceGroupName')
  },
  {
    align: 'center',
    width: '20%',
    title: <LanguageEntry {...lang.table.resources} />,
    dataIndex: 'countOfResources',
    key: 'countOfResources',
    sorter: enableSort && sortByNumber('countOfResources')
  },
  {
    align: 'center',
    width: '20%',
    title: <LanguageEntry {...lang.table.estimateCost} />,
    dataIndex: 'totalCost',
    key: 'totalCost',
    sorter: enableSort && sortByNumber('totalCost'),
    render: renderSpend
  },
  {
    align: 'center',
    width: '20%',
    title: <LanguageEntry {...lang.table.percentOfTotalCost} />,
    dataIndex: 'percentOfTotalCost',
    key: 'percentOfTotalCost',
    sorter: enableSort && sortByNumber('percentOfTotalCost'),
    render: percentOfTotalCost => `${(percentOfTotalCost * 100).toFixed(0)}%`
  }
];
