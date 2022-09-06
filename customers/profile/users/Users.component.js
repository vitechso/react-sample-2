import React from 'react';
import * as R from 'ramda';
import SimpleTable from 'src/components/simpleTable';
import { generateTableColumns } from './Users.config';

const Users = ({ company }) => {
  const users = company.users ?? [];
  const dataSource = users.map(user => ({
    ...user,
    plans: user.plans.join(', ')
  }));
  const tenantId = R.path(['microsoft', 'tenantId'], company);
  const columns = generateTableColumns({ tenantId });
  const tableProps = {
    columns,
    dataSource,
    loading: users.length === 0,
    pageSize: 50,
    x: 1450
  };

  return <SimpleTable {...tableProps} />;
};

export default Users;
