import React from 'react';
import { LanguageEntry } from '@accordo-feed/language.entry';

import { sortByAlph, sortByNumber, convertBytes } from 'src/utils';
import lang from './detectedApps.lang';

/***************
 *   CONFIGS   *
 ***************/

export const TableColumns = [
  {
    title: <LanguageEntry {...lang.table.application} />,
    dataIndex: 'application',
    key: 'application',
    fixed: 'left',
    sorter: sortByAlph('application')
  },
  {
    title: <LanguageEntry {...lang.table.version} />,
    dataIndex: 'version',
    key: 'version',
    sorter: sortByNumber('version')
  },
  {
    title: <LanguageEntry {...lang.table.deviceCount} />,
    dataIndex: 'deviceCount',
    key: 'deviceCount',
    sorter: sortByNumber('deviceCount')
  },
  {
    title: <LanguageEntry {...lang.table.appSize} />,
    dataIndex: 'appSize',
    key: 'appSize',
    sorter: sortByNumber('appSize'),
    render: e => convertBytes(e || 0)
  }
];
