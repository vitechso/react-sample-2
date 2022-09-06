import React from 'react';

import SimpleTable from 'src/components/simpleTable';
import { TableColumns as columns } from './detectedApps.config';

const DetectedApps = ({ dataSource }) => {
  const tableProps = {
    dataSource,
    columns,
    loading: !dataSource || dataSource.length === 0,
    pageSize: 10,
    x: 700
  };

  return <SimpleTable {...tableProps} />;
};

export default DetectedApps;
