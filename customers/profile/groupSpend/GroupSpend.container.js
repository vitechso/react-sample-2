// @flow

import React from 'react';

import { widgetDataHOC } from 'src/hoc';
import type { ResourceGroupType } from '../resourcesByGroup/ResourcesByGroup.component';
import GroupSpendComponent from './GroupSpend.component';

/*************
 *   TYPES   *
 *************/

type Props = {
  data: {
    spendingBudget: number,
    percentOfBudgetSpent: number,
    resourceGroups: Array<ResourceGroupType>
  }
};

const GroupSpend = ({ data }: Props) => <GroupSpendComponent data={data.resourceGroups} />;

export default widgetDataHOC(['data', 'resourceGroups'])(GroupSpend);
