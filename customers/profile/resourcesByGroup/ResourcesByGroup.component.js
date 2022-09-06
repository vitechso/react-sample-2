import React from 'react';
import SimpleTable from 'src/components/simpleTable';
import { widgetDataHOC } from 'src/hoc';
import { generateTableColumns } from './ResourcesByGroup.config';

/*************
 *   TYPES   *
 *************/

export type ResourceGroupType = {
  countOfResources: number,
  percentOfTotalCost: number,
  resourceGroupName: string,
  totalCost: number
};

type Props = {
  data: {
    spendingBudget: number,
    percentOfBudgetSpent: number,
    resourceGroups: Array<ResourceGroupType>
  }
};

/*****************
 *   COMPONENT   *
 *****************/

const ResourcesByGroup = ({ data }: Props) => {
  const dataSource = data.resourceGroups || [];

  const tableProps = {
    dataSource,
    columns: generateTableColumns({ enableSort: true }),
    loading: !dataSource || dataSource.length === 0,
    pageSize: 10,
    x: 670
  };

  return <SimpleTable {...tableProps} />;
};

export default widgetDataHOC(['data', 'resourceGroups'])(ResourcesByGroup);
