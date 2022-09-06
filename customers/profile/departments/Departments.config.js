import React from 'react';
import { LanguageEntry } from '@accordo-feed/language.entry';

import StyledLink from 'src/components/link';
import { renderSpend } from 'src/pages/masterList/masterList.config';
import { PATHS, SUBMODULES } from 'src/constants';
import { sortByAlph, sortByNumber } from 'src/utils';
import lang from './Departments.lang';

/***************
 *   CONFIGS   *
 ***************/

export const TableColumns = [
  {
    title: <LanguageEntry {...lang.table.name} />,
    className: 'at_columnName',
    dataIndex: 'name',
    key: 'name',
    width: '5%',
    fixed: 'left',
    sorter: sortByAlph('name')
  },
  {
    title: <LanguageEntry {...lang.table.users} />,
    className: 'at_columnUsers',
    dataIndex: 'employees',
    key: 'users',
    width: '3%',
    render: (users, { name, orgId }) => (
      <StyledLink
        to={{
          pathname: `/${SUBMODULES.OFFICE_365_OPTIMIZER}/${orgId}/users`,
          state: { prevPath: PATHS.DASHBOARD.ROOT, search: name }
        }}
      >
        {users}
      </StyledLink>
    ),
    sorter: sortByNumber('employees')
  },
  {
    title: <LanguageEntry {...lang.table.plans} />,
    className: 'at_columnPlans',
    dataIndex: 'plans',
    key: 'plans',
    width: '10%',
    sorter: sortByAlph('plans')
  },
  {
    title: <LanguageEntry {...lang.table.annual} />,
    className: 'at_columnAnnual',
    dataIndex: 'cost',
    key: 'annual',
    width: '5%',
    render: renderSpend,
    sorter: sortByNumber('cost')
  }
];
