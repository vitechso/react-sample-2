import React from 'react';
import { LanguageEntry } from '@accordo-feed/language.entry';
import lang from './UtilizationByLastLogin.lang';
import { sortByAlph, sortByNumber } from 'src/utils';

/***************
 *   CONFIGS   *
 ***************/

const defaultWidth = {
  small: 80,
  medium: 100,
  large: 120
};

export const generateTableColumns = props => {
  const { enableSort } = props;
  return [
    {
      title: <LanguageEntry {...lang.table.name} />,
      width: defaultWidth.medium,
      dataIndex: 'application',
      key: 'name',
      sorter: enableSort && sortByAlph('application')
    },
    {
      align: 'center',
      title: <LanguageEntry {...lang.table.recent} />,
      width: defaultWidth.medium,
      dataIndex: 'activeUsers',
      key: 'recent',
      sorter: enableSort && sortByNumber('activeUsers')
    },
    {
      align: 'center',
      title: <LanguageEntry {...lang.table.lessActive} />,
      width: defaultWidth.large,
      dataIndex: 'lessActiveUsers',
      key: 'lessActiveUsers',
      sorter: enableSort && sortByNumber('lessActiveUsers')
    },
    {
      align: 'center',
      title: <LanguageEntry {...lang.table.inactive} />,
      width: defaultWidth.small,
      dataIndex: 'inactiveUsers',
      key: 'inactiveUsers',
      sorter: enableSort && sortByNumber('inactiveUsers')
    }
  ];
};
