// @flow

import React from 'react';

import { widgetDataHOC } from 'src/hoc';
import { CompanyType } from '../customerProfile.constants';
import UsersComponent from './Users.component';

type UsersProps = {
  company: CompanyType
};

const Users = ({ company }: UsersProps) => <UsersComponent company={company} />;

export default widgetDataHOC(['company', 'users'])(Users);
