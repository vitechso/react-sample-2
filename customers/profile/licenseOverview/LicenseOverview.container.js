// @flow
import React from 'react';
import { CompanyType } from '../customerProfile.constants';
import LicenseOverviewComponent from './LicenseOverview.component';

type LicenseOverviewProps = {
  company: CompanyType
};

const LicenseOverview = ({ company }: LicenseOverviewProps) => <LicenseOverviewComponent company={company} />;

export default LicenseOverview;
