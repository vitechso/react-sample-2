// @flow

import React from 'react';

import { widgetDataHOC } from 'src/hoc';
import { CompanyType } from './customerProfile.constants';
import UtilizationByLastLogin from './utilizationByLastLogin';
import UtilizationByActivity from './utilizationByActivity';

/*************
 *   TYPES   *
 *************/

type Props = {
  company: CompanyType
};

/*****************
 *   COMPONENT   *
 *****************/

const Utilization = ({ company }: Props) => (
  <div className="widget-body">
    <UtilizationByLastLogin key="utilizationByLastLogin" dataSource={company.adoptions?.details ?? []} />
    <UtilizationByActivity key="utilizationByActivity" dataSource={company.adoptions?.details ?? []} />
  </div>
);

export default widgetDataHOC(['company', 'adoptions', 'details'])(Utilization);
