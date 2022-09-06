// @flow

import React, { useEffect, useMemo, useState } from 'react';
import { Responsive } from 'react-grid-layout';
import { SizeMe } from 'react-sizeme';

import Widget from 'src/components/widget';
import LicenseAssignments from '../profile/LicenseAssignments.component';
import Users from '../profile/users/Users.component';
import * as Styled from './LicenseAssignment.styled';
import { BaseLicenses, COLS, BREAKPOINTS } from '../profile/LicenseAssignment.constants';

const LAYOUTS = {
  lg: [
    { i: 'licenseAssignments', x: 0, y: 0, w: 12, h: 6.5 },
    { i: 'licenseSelectionResults', x: 0, y: 6, w: 12, h: 7 }
  ],
  xs: [
    { i: 'licenseAssignments', x: 0, y: 0, w: 12, h: 6.5 },
    { i: 'licenseSelectionResults', x: 0, y: 6, w: 12, h: 7 }
  ]
};

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
  customers: Array<Object>,
  securityScoreData: Object,
  router: Object,
  actions: {
    fetchCustomerUsers: Function,
    fetchCustomerPlans: Function,
    getSecurityRecommendations: Function,
    getSecurityControlProfileData: Function
  },
  theme?: 'light' | 'dark'
};

/*****************
 *   COMPONENT   *
 *****************/

export default (props: Props) => {
  const { customers, params, actions, theme, router } = props;
  const [plan, setPlan] = useState(null);
  const [basePlan, setBaseplan] = useState(null);
  const [title, setTitle] = useState('All Users');

  const enableClick = router.location.pathname.includes('/licenseAssignments');
  const company = useMemo(() => customers.find(c => c.id === params.id) || {}, [params, customers]);

  useEffect(() => {
    actions.fetchCustomerPlans(params.id);
    actions.fetchCustomerUsers(params.id);
    actions.getSecurityRecommendations(params.id);
    actions.getSecurityControlProfileData(params.id);
  }, [params, actions]);

  let filteredUsers = [];

  const usersWithoutAnyPlan = company.users && company.users.filter(user => user.plans.length !== 0);

  if (basePlan === 'No License Assigned' && plan === 'No License Assigned') {
    filteredUsers = usersWithoutAnyPlan.filter(user => user.plans.length === 0);
  } else if (basePlan) {
    if (basePlan === 'No License Assigned') {
      const usersWithNoLicense = usersWithoutAnyPlan.filter(user => user.plans.length === 0);
      const usersWithAddons = usersWithoutAnyPlan.filter(user => user.plans.length !== 0);
      const usersWithOnlyAddon = usersWithAddons.filter(user => !user.plans.some(item => BaseLicenses.includes(item)));
      filteredUsers = [...usersWithNoLicense, ...usersWithOnlyAddon];
    } else {
      filteredUsers = basePlan
        ? usersWithoutAnyPlan.filter(user => user.plans.includes(basePlan))
        : usersWithoutAnyPlan;
    }
  } else if (plan === 'No Addons assigned') {
    filteredUsers = usersWithoutAnyPlan.filter(user => user.plans.length === 0);
  } else {
    filteredUsers = plan
      ? usersWithoutAnyPlan.filter(user => user.plans.sort().join(', ') === plan)
      : usersWithoutAnyPlan;
  }

  const selectedUsers = filteredUsers !== undefined ? filteredUsers.length : 0;

  return (
    <Styled.DynamicWidgetsContainer>
      <SizeMe>
        {({ size }) => (
          <Responsive
            rowHeight={70}
            isResizable={false}
            isDraggable={false}
            containerPadding={[24, 10]}
            margin={[24, 24]}
            breakpoints={BREAKPOINTS}
            cols={COLS}
            containerWidth={size.width ? size.width : 0}
            width={size.width ? size.width : 0}
            layouts={LAYOUTS}
          >
            <Widget
              key="licenseAssignments"
              widgetId="licenseAssignments"
              title="License Assignments"
              subTitle="Inspector Tree"
            >
              <LicenseAssignments
                users={usersWithoutAnyPlan || []}
                company={company}
                theme={theme}
                setTitle={setTitle}
                setBaseplan={setBaseplan}
                setPlan={setPlan}
                enableClick={enableClick}
              />
            </Widget>
            <Widget
              key="licenseSelectionResults"
              widgetId="licenseSelectionResults"
              title={title}
              subTitle={`${selectedUsers} Users Selected`}
            >
              <Users company={{ ...company, users: filteredUsers }} />
            </Widget>
          </Responsive>
        )}
      </SizeMe>
    </Styled.DynamicWidgetsContainer>
  );
};
