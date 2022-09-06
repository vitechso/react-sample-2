import React, { useMemo } from 'react';
import SimpleTable from 'src/components/simpleTable';
import { PATHS, SUBMODULES } from 'src/constants';
import { widgetDataHOC } from 'src/hoc';
import { sortByAlph, sortByNumber } from 'src/utils';
import * as Styled from './plans.styled';

const Plans = ({ company, formatCurrency }) => {
  const plans = company.plans || [];

  const columns = useMemo(
    () => [
      {
        title: 'Plan Type',
        dataIndex: 'planType',
        key: 'planType',
        width: '25%',
        fixed: 'left',
        sorter: sortByAlph('planType')
      },
      {
        title: 'Price/User/Month',
        dataIndex: 'price',
        key: 'price',
        render: value => formatCurrency(value),
        sorter: sortByNumber('price')
      },
      {
        title: 'Total Licenses',
        dataIndex: 'totalLicenses',
        key: 'totalLicenses',
        render: (value, { planType }) => (
          <Styled.Link
            to={{
              pathname: `/${SUBMODULES.OFFICE_365_OPTIMIZER}/${company.id}/users`,
              state: { prevPath: `${PATHS.CUSTOMERS.ROOT}/${company.id}`, search: planType }
            }}
          >
            {value}
          </Styled.Link>
        ),
        sorter: sortByNumber('totalLicenses')
      },
      {
        title: 'Unassigned',
        dataIndex: 'unassigned',
        key: 'unassigned',
        sorter: sortByNumber('unassigned')
      },
      {
        title: 'Monthly',
        dataIndex: 'monthly',
        key: 'monthly',
        render: value => formatCurrency(value),
        sorter: sortByNumber('monthly')
      },
      {
        title: 'Annual',
        dataIndex: 'annual',
        key: 'annual',
        render: value => formatCurrency(value),
        sorter: sortByNumber('annual')
      }
    ],
    [company]
  );

  const dataSource = useMemo(() => {
    return (
      plans?.map(plan => ({
        key: plan.name,
        planType: plan.name,
        price: plan.userMonthlyPrice,
        totalLicenses: plan.purchased,
        unassigned: plan.purchased - plan.assigned,
        monthly: plan.monthlySpend,
        annual: plan.annualSpend
      })) || []
    );
  }, [plans]);

  const tableProps = {
    columns,
    dataSource,
    loading: !plans,
    x: 900
  };

  return <SimpleTable {...tableProps} />;
};

export default widgetDataHOC(['company', 'plans'])(Plans);
