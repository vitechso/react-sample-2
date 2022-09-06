import React from 'react';
import * as R from 'ramda';

import SimpleTable from 'src/components/simpleTable';
import { TableColumns as columns } from './Departments.config';

const Departments = ({ departments, orgId, users }) => {
  const dataSource = departments.map(department => {
    const { name } = department;
    let plans = [];
    users.forEach(user => {
      if (R.includes(name, user.department)) plans = R.concat(plans, user.plans);
    });
    plans = R.uniq(plans).join(', ');
    return { ...department, orgId, plans };
  });

  const tableProps = {
    dataSource,
    columns,
    loading: !departments || departments.length === 0,
    x: 700
  };

  return <SimpleTable {...tableProps} />;
};

export default Departments;
