// @flow

import React, { useEffect, useMemo, useState } from 'react';
import * as R from 'ramda';
import { Responsive } from 'react-grid-layout';
import { SizeMe } from 'react-sizeme';

import ViewMore from 'src/components/viewMore';
import Widget from 'src/components/widget';
import { PATHS } from 'src/constants';
import CompanyInfo from './companyInfo';
import Departments from './departments';
import DetectedApps from './detectedApps';
import LicenseAllocation from './LicenseAllocation.container';
import LicenseAssignments from './LicenseAssignments.component';
import SpendByLicense from './spendByLicense';
import SecurityScoresMeter from './securityScores';
import LicenseOverview from './licenseOverview';
import Recommendations from './recommendations';
import SecurityRecommendations from './securityRecommendations';
import Plans from './plans';
import Utilization from './Utilization.container';
import Users from './users';
import Subscriptions from './subscriptions';
import ResourcesByGroup from './resourcesByGroup';
import GroupSpend from './groupSpend';
import { CompanyType, SUBSCRIPTIONS_MOCK_DATA, DETECTED_APPS_MOCK_DATA } from './customerProfile.constants';
import * as Styled from './customerprofile.styled';

const LAYOUTS = {
  xl: [
    { i: 'companyInfo', x: 0, y: 0, w: 6, h: 3 },
    { i: 'licenseOverview', x: 0, y: 1, w: 6, h: 2.5 },
    { i: 'secureScore', x: 6, y: 2, w: 3, h: 5.5 },
    { i: 'spendByLicense', x: 9, y: 3, w: 3, h: 5.5 },
    { i: 'recommendations', x: 0, y: 4, w: 6, h: 6 },
    { i: 'securityRecommendations', x: 6, y: 5, w: 6, h: 6 },
    { i: 'plans', x: 0, y: 6, w: 6, h: 5 },
    { i: 'departments', x: 6, y: 7, w: 6, h: 5 },
    { i: 'subscriptions', x: 0, y: 8, w: 12, h: 3, minH: 3, maxH: 7 },
    { i: 'utilization', x: 0, y: 9, w: 6, h: 8 },
    { i: 'licenseAssignments', x: 6, y: 10, w: 6, h: 8 },
    { i: 'resourcesByGroup', x: 0, y: 11, w: 9, h: 5.2 },
    { i: 'groupSpend', x: 9, y: 12, w: 3, h: 5.2 },
    { i: 'users', x: 0, y: 13, w: 12, h: 7 },
    { i: 'm365LicensesChart', x: 0, y: 14, w: 6, h: 5 },
    { i: 'detectedApps', x: 6, y: 14, w: 6, h: 5 }
  ],
  lg: [
    { i: 'companyInfo', x: 0, y: 0, w: 6, h: 3.2 },
    { i: 'licenseOverview', x: 0, y: 1, w: 6, h: 2.5 },
    { i: 'secureScore', x: 6, y: 2, w: 3, h: 5.7 },
    { i: 'spendByLicense', x: 9, y: 3, w: 3, h: 5.7 },
    { i: 'recommendations', x: 0, y: 4, w: 6, h: 6 },
    { i: 'securityRecommendations', x: 6, y: 5, w: 6, h: 6 },
    { i: 'plans', x: 0, y: 6, w: 6, h: 5 },
    { i: 'departments', x: 6, y: 7, w: 6, h: 5 },
    { i: 'subscriptions', x: 0, y: 8, w: 12, h: 3, minH: 3, maxH: 7 },
    { i: 'utilization', x: 0, y: 9, w: 6, h: 8 },
    { i: 'licenseAssignments', x: 6, y: 10, w: 6, h: 8 },
    { i: 'resourcesByGroup', x: 0, y: 11, w: 9, h: 5.2 },
    { i: 'groupSpend', x: 9, y: 12, w: 3, h: 5.2 },
    { i: 'users', x: 0, y: 13, w: 12, h: 7 },
    { i: 'm365LicensesChart', x: 0, y: 14, w: 6, h: 5 },
    { i: 'detectedApps', x: 6, y: 14, w: 6, h: 5 }
  ],
  xs: [
    { i: 'companyInfo', x: 0, y: 0, w: 1, h: 4.5 },
    { i: 'licenseOverview', x: 0, y: 1, w: 1, h: 2.5 },
    { i: 'secureScore', x: 0, y: 2, w: 1, h: 5.2 },
    { i: 'spendByLicense', x: 0, y: 3, w: 1, h: 5.2 },
    { i: 'recommendations', x: 0, y: 4, w: 1, h: 6 },
    { i: 'securityRecommendations', x: 6, y: 5, w: 1, h: 6 },
    { i: 'subscriptions', x: 0, y: 6, w: 1, h: 3, minH: 3, maxH: 7 },
    { i: 'licenseAssignments', x: 0, y: 7, w: 1, h: 8 },
    { i: 'plans', x: 0, y: 8, w: 1, h: 5 },
    { i: 'departments', x: 0, y: 9, w: 1, h: 5 },
    { i: 'utilization', x: 0, y: 10, w: 1, h: 8 },
    { i: 'resourcesByGroup', x: 0, y: 11, w: 1, h: 5.2 },
    { i: 'groupSpend', x: 9, y: 12, w: 1, h: 5.2 },
    { i: 'users', x: 0, y: 13, w: 1, h: 7 },
    { i: 'm365LicensesChart', x: 0, y: 14, w: 1, h: 5 },
    { i: 'detectedApps', x: 0, y: 15, w: 1, h: 5 }
  ]
};

const BREAKPOINTS = { xl: 1526, lg: 978, xs: 0 };
const COLS = { xl: 12, lg: 12, xs: 1 };

/*************
 *   TYPES   *
 *************/

export type Actions = {
  setAddDialogOpened: Function,
  setCustomerDeletedState: Function,
  setCustomerDeletedIdState: Function,
  setSearchTerm: Function
};

type Props = {
  params: Object,
  customers: Array<CompanyType>,
  overrides: Object,
  securityScoreData: Object,
  actions: {
    fetchCustomerDetails: Function,
    getOrganizationData: Function
  },
  theme?: 'light' | 'dark'
};

/*****************
 *   COMPONENT   *
 *****************/

export default (props: Props) => {
  const { customers, params, actions, overrides, securityScoreData, theme } = props;
  const company = useMemo(() => customers.find(c => c.id === params.id) || {}, [params, customers]);
  const [expand, setExpand] = useState('');

  const isDev = process.env.NODE_ENV === 'development';
  const LAYOUTS_EXPANDED = {
    xl: [{ i: expand, x: 0, y: 0, w: 12, h: 8 }],
    lg: [{ i: expand, x: 0, y: 0, w: 12, h: 7 }],
    xs: [{ i: expand, x: 0, y: 0, w: 12, h: 7 }]
  };

  useEffect(() => {
    actions.getOrganizationData();
  }, []);

  useEffect(() => {
    if (params.id) {
      actions.fetchCustomerDetails(params.id);
    }
  }, [params, actions]);

  const handleExpand = e => () => {
    if (expand === '') {
      setExpand(e);
    } else {
      setExpand('');
    }
  };

  const companyWidgets = [
    <Widget key="companyInfo" title="Company Details" subTitle="Connection Status" status={true}>
      <CompanyInfo company={company} />
    </Widget>,
    <Widget key="licenseOverview" title="License Allocation" subTitle="M365 Licenses">
      <LicenseOverview company={company} />
    </Widget>,
    <Widget
      key="secureScore"
      title="Secure Score Index"
      subTitle="M365 Assignment &amp; Usage"
      footerContent={<ViewMore path={PATHS.SECURITY_SCORE.CLIENT_DETAILS.replace(/:clientId/, company.id)} />}
    >
      <SecurityScoresMeter securityScore={securityScoreData} theme={theme} />
    </Widget>,
    <Widget
      key="spendByLicense"
      title="Spend Management"
      subTitle="By License Plan"
      expanded={expand !== ''}
      onExpand={handleExpand('spendByLicense')}
    >
      <SpendByLicense company={company} />
    </Widget>,
    <Widget
      key="recommendations"
      title="Recommendations"
      footerContent={<ViewMore path={PATHS.OFFICE_365_OPTIMIZER.RECOMMENDATIONS.replace(/{{ orgId }}/, company.id)} />}
    >
      <Recommendations company={company} overrides={overrides} />
    </Widget>,
    <Widget
      key="securityRecommendations"
      title="Security Recommendations"
      footerContent={<ViewMore path={PATHS.SECURITY_SCORE.CLIENT_DETAILS.replace(/:clientId/, company.id)} />}
    >
      <SecurityRecommendations company={company} />
    </Widget>,
    <Widget
      key="plans"
      widgetId="plans"
      title="Allocation"
      subTitle="By Plan"
      footerContent={<ViewMore path={PATHS.OFFICE_365_OPTIMIZER.PLANS.replace(/{{ orgId }}/, company.id)} />}
    >
      <Plans company={company} />
    </Widget>,
    <Widget
      key="departments"
      widgetId="departments"
      title="Allocation"
      subTitle="By Department"
      footerContent={<ViewMore path={PATHS.OFFICE_365_OPTIMIZER.DEPARTMENT_SPEND.replace(/{{ orgId }}/, company.id)} />}
    >
      <Departments company={company} />
    </Widget>,
    <Styled.CustomWidget
      key="utilization"
      widgetId="utilization"
      title="Utilization"
      subTitle="License Adoption &amp; Usage"
      footerContent={<ViewMore />}
    >
      <Utilization company={company} />
    </Styled.CustomWidget>,
    <Widget
      key="users"
      widgetId="users"
      title="Users"
      footerContent={<ViewMore path={PATHS.OFFICE_365_OPTIMIZER.USERS.replace(/{{ orgId }}/, company.id)} />}
    >
      <Users company={company} />
    </Widget>,
    <Widget
      key="licenseAssignments"
      title="License Assignments"
      expanded={expand !== ''}
      onExpand={handleExpand('licenseAssignments')}
      footerContent={<ViewMore path={PATHS.CUSTOMERS.LICENSE_ASSIGNMENT.replace(/:id/, company.id)} />}
    >
      <LicenseAssignments company={company} theme={theme} />
    </Widget>,
    <Widget
      key="m365LicensesChart"
      title="M365 Licenses"
      subTitle="Plan Breakdown"
      expanded={expand !== ''}
      onExpand={handleExpand('m365LicensesChart')}
    >
      <LicenseAllocation company={company} />
    </Widget>
  ];

  const devWidgets = [
    <Widget key="subscriptions" title="Subscriptions">
      <Subscriptions subscriptions={SUBSCRIPTIONS_MOCK_DATA} />
    </Widget>,
    <Widget
      key="resourcesByGroup"
      title="Resources by Group"
      headerRight={
        company.azureResources && company.azureResources.spendingBudget ? (
          <Styled.BudgetInfoWrap>
            <Styled.BudgetInfo>Budgeted : {company.azureResources.spendingBudget} </Styled.BudgetInfo>
            <Styled.BudgetInfo> % of Budget Spent : {company.azureResources.percentOfBudgetSpent} </Styled.BudgetInfo>
          </Styled.BudgetInfoWrap>
        ) : null
      }
    >
      <ResourcesByGroup data={company.azureResources || {}} />
    </Widget>,
    <Widget key="groupSpend" title="Group Spend" expanded={expand !== ''} onExpand={handleExpand('groupSpend')}>
      <GroupSpend data={company.azureResources || {}} />
    </Widget>,
    <Widget key="detectedApps" title="Detected Apps" footerContent={<ViewMore path={``} />}>
      <DetectedApps data={DETECTED_APPS_MOCK_DATA} />
    </Widget>
  ];

  const WIDGETS = isDev ? R.concat(companyWidgets, devWidgets) : companyWidgets;

  const renderWidgets = () => {
    if (expand === '') {
      return WIDGETS.map(e => e);
    } else {
      const widget = R.find(R.propEq('key', expand), WIDGETS);
      if (widget) {
        return widget;
      } else {
        return <Widget key={expand} />;
      }
    }
  };

  return (
    <SizeMe>
      {({ size }) => (
        <Responsive
          breakpoints={BREAKPOINTS}
          cols={COLS}
          containerWidth={size.width ? size.width : 0}
          width={size.width ? size.width : 0}
          className="layout"
          rowHeight={70}
          containerPadding={[24, 10]}
          margin={[24, 24]}
          isResizable={false}
          isDraggable={false}
          layouts={expand !== '' ? LAYOUTS_EXPANDED : LAYOUTS}
        >
          {renderWidgets()}
        </Responsive>
      )}
    </SizeMe>
  );
};
