import React from 'react';
import { LanguageEntry } from '@accordo-feed/language.entry';
import { convertBytes, sortByAlph, sortByNumber } from 'src/utils';
import lang from './UtilizationByActivity.lang';

export const generateTableColumns = props => {
  const { enableSort } = props;
  return [
    {
      title: <LanguageEntry {...lang.table.name} />,
      dataIndex: 'application',
      key: 'name',
      sorter: enableSort && sortByAlph('application')
    },
    {
      align: 'center',
      title: <LanguageEntry {...lang.table.activity} />,
      dataIndex: 'activity',
      key: 'activity',
      render: () => '*****'
    },
    {
      align: 'center',
      title: <LanguageEntry {...lang.table.storage} />,
      dataIndex: 'storage',
      key: 'storage',
      width: '20%',
      sorter: enableSort && sortByNumber('storage'),
      render: e => convertBytes(e || 0)
    },
    {
      align: 'center',
      title: <LanguageEntry {...lang.table.recommendations} />,
      dataIndex: ['recommendations', 'savings'],
      key: 'recommendations',
      sorter: enableSort && sortByNumber('recommendations', 'savings')
    }
  ];
};
