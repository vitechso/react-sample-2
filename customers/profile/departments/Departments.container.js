// @flow

import React from 'react';
import { widgetDataHOC } from 'src/hoc';
import { CompanyType } from '../customerProfile.constants';
import DepartmentsComponent from './Departments.component';

type DepartmentsProps = {
  company: CompanyType
};

const Departments = ({ company }: DepartmentsProps) => (
  <DepartmentsComponent departments={company.departments ?? []} orgId={company.id} users={company.users ?? []} />
);

export default widgetDataHOC(['company', 'departments'])(Departments);
