import React, { memo, useCallback, useMemo } from 'react';
import { compose } from 'recompose';
import { constants, darkTheme } from '@accordo-feed/aco-styled-components';
import { widgetDataHOC } from 'src/hoc';
import { hexToRgb } from 'src/utils';
import { BaseLicenses } from './LicenseAssignment.constants';
import * as Styled from './customerprofile.styled';

const { colors } = constants;

const LicenseAssignments = ({ company, theme, setTitle, setPlan, setBaseplan, enableClick }) => {
  const users = company.users ?? [];
  const details = company.details ?? {};

  const onChartClick = useCallback(params => {
    setTitle(title(params));
    if (params.data.orgName) {
      setPlan(null);
      setBaseplan(null);
    } else if (params.data.baseLicense === undefined) {
      if (params.data.name === 'No License Assigned') {
        setBaseplan('No License Assigned');
        setPlan(null);
      } else {
        setBaseplan(params.data.name);
        setPlan(null);
      }
    } else if (params.data.baseLicense === '' && params.data.name === 'No License Assigned') {
      setPlan('No License Assigned');
      setBaseplan('No License Assigned');
    } else if (params.data.baseLicense === '' && params.data.name !== null) {
      setPlan(params.data.name);
      setBaseplan(null);
    } else {
      if (params.data.baseLicense === params.data.name) {
        setPlan(params.data.name);
        setBaseplan(null);
      } else {
        const name = params.data.baseLicense + ', ' + params.data.name;
        const plansList = name.split(', ');
        const sortedNameList = plansList.sort().join(', ');
        setPlan(sortedNameList);
        setBaseplan(null);
      }
    }
  }, []);

  const usersWithoutAnyPlan = users && users.filter(user => user.plans.length !== 0);

  const getBaseLicensByPlan = plansList => {
    const baseLicenceName = plansList.filter(plan => BaseLicenses.includes(plan)); // extract baseplan from plan list
    return baseLicenceName;
  };

  const getPlanList = plansList => {
    const plans = plansList.length > 1 ? plansList.filter(base => !BaseLicenses.includes(base)) : plansList; // remove base plan from plan list
    return plans;
  };

  const title = params => {
    const name = params.name.split(`, `);
    const baseLicenceName = params.data.baseLicense;
    baseLicenceName && name.splice(0, 0, baseLicenceName);
    const filterNames = name.length > 1 ? name.filter((item, index) => name.indexOf(item) === index) : name;
    const tooltipHeading = filterNames.join(' + ');
    return tooltipHeading;
  };

  const options = useMemo(() => {
    const planMap = usersWithoutAnyPlan.reduce((map, { name: userName, plans, accountEnabled }) => {
      const sortPlans = plans.sort().join(', ');
      map[sortPlans] = {
        name: sortPlans,
        children: [...(map[sortPlans]?.children || []), { name: userName, accountEnabled }]
      };

      const misassignedCount = map[sortPlans].children.reduce(
        (acc, cur) => (cur.accountEnabled === false ? ++acc : acc),
        0
      );
      map[sortPlans].misassignedCount = misassignedCount;

      return map;
    }, {});

    const orgChildren = Object.entries(planMap).reduce((acc, item) => {
      const [plan, { children }] = item;
      const plansList = plan.split(', ');

      const baseLicense = getBaseLicensByPlan(plansList);
      const baseLicenseName = baseLicense.toString();

      const planLabel =
        plan === ''
          ? 'No Addons assigned'
          : plansList !== ''
          ? getPlanList(plansList).join(', ')
          : 'No License Assigned';

      acc[baseLicenseName] = {
        name: baseLicenseName === '' ? 'No License Assigned' : baseLicenseName,
        collapsed: false,
        value: [acc[baseLicenseName]?.value || 0, children.length].reduce((a, b) => a + b, 0),
        children: [
          ...(acc[baseLicenseName]?.children || []),
          {
            name: planLabel,
            baseLicense: baseLicenseName,
            value: children.length,
            collapsed: true,
            totalLicense: parseInt(children.length) - parseInt(item[1].misassignedCount),
            misassignedCount: item[1].misassignedCount
          }
        ]
      };
      return acc;
    }, {});

    const data = {
      name: details.name || 'Org',
      orgName: true,
      value: Object.values(orgChildren).reduce((a, b) => a + b.value, 0),
      children: [...Object.values(orgChildren)]
    };

    return {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        textStyle: theme === 'dark' ? colors.white : colors.grey,
        borderColor: colors.lightGrey1,
        backgroundColor: theme === 'dark' ? colors.darkBlue1 : colors.lightGrey3,
        formatter: function(params) {
          const name = params.name.split(`, `);
          const baseLicenceName = params.data.baseLicense;
          baseLicenceName && name.splice(0, 0, baseLicenceName);
          const filterNames = name.length > 1 ? name.filter((item, index) => name.indexOf(item) === index) : name;
          const tooltipHeading = filterNames.join(' + ');
          let str = `<span style="color: ${colors.skyBlue};font-weight: 500"; >${tooltipHeading}</span>  <br/>
          Active Assigned: <span style="color: ${colors.teal};">${
            params.data.collapsed ? params.data.totalLicense : params.data.value
          }</span><br/>`;

          if (params.data.collapsed) {
            str =
              str + `Misassigned: <span style="color: ${colors.aquaRed};">${params.data.misassignedCount}</span><br/>`;
          }
          return str;
        }
      },
      series: [
        {
          type: 'tree',
          data: [data],
          symbolSize: 0,
          itemStyle: {
            borderWidth: 0
          },

          label: {
            formatter: function(params) {
              var arr = [];
              const label = `${params.name.substring(0, 20)}${params.name.length > 20 ? '...' : ''}`;

              if (params.value) {
                arr = [`{b|${label}}`, `{c|${params.value}}`];
              } else {
                arr = [`{b|${label}}`, '{d|}'];
              }
              return arr.join('');
            },
            position: 'left',
            rich: {
              c: {
                align: 'left',
                padding: [2, 10],
                color: theme === 'dark' ? colors.white : colors.grey,
                backgroundColor: theme === 'dark' ? colors.darkBlue1 : colors.lightGrey3,
                borderColor: colors.lightGrey1,
                borderWidth: 1,
                borderRadius: [12, 12, 12, 12]
              },
              b: {
                lineHeight: 22,
                align: 'center',
                padding: [0, 10, 0, 10],
                color: theme === 'dark' ? colors.white : colors.grey,
                backgroundColor: theme === 'dark' ? darkTheme.tableEvenRowBackground : colors.white
              },
              d: {
                width: 10,
                height: 10,
                backgroundColor: colors.white,
                borderColor: colors.lightGrey1,
                borderWidth: 1,
                borderRadius: [12, 12, 12, 12]
              }
            }
          },

          leaves: {
            label: {
              formatter: function(params) {
                var arr = [];
                if (params.value) {
                  if (params.data.misassignedCount > 0) {
                    arr = [`{a|${params.value}}`, `{b|${params.name}}`];
                  } else {
                    arr = [`{c|${params.value}}`, `{b|${params.name}}`];
                  }
                } else {
                  arr = ['{d|}', `{b|${params.name}}`];
                }
                return arr.join('');
              },
              position: 'right',
              rich: {
                c: {
                  color: theme === 'dark' ? colors.white : colors.grey,
                  align: 'left',
                  padding: [2, 10],
                  backgroundColor: theme === 'dark' ? colors.darkBlue1 : colors.lightGrey3,
                  borderColor: colors.lightGrey1,
                  borderWidth: 1,
                  borderRadius: [12, 12, 12, 12]
                },
                a: {
                  color: colors.white,
                  align: 'left',
                  padding: [2, 10],
                  backgroundColor: `rgba(${hexToRgb(colors.aquaRed)}, 0.6)`,
                  borderColor: colors.aquaRed,
                  borderWidth: 1,
                  borderRadius: [12, 12, 12, 12]
                },
                b: {
                  align: 'left',
                  padding: [0, 0, 0, 10],
                  backgroundColor: 'none'
                },
                d: {
                  width: 10,
                  height: 10,
                  backgroundColor: colors.white,
                  borderColor: colors.lightGrey1,
                  borderWidth: 1,
                  borderRadius: [12, 12, 12, 12]
                }
              }
            }
          },
          emphasis: {
            focus: 'descendant',
            rich: {
              b: {
                align: 'left',
                padding: [0, 0, 0, 10],
                backgroundColor: 'none'
              }
            }
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
          top: '5%',
          left: '15%',
          bottom: '2%',
          right: '25%'
        }
      ]
    };
  }, [usersWithoutAnyPlan, theme]);

  if (usersWithoutAnyPlan.length === 0) {
    return null;
  }

  const onEvents = {
    click: enableClick ? onChartClick : null
  };

  return <Styled.Chart lazyUpdate notMerg opts={{ renderer: 'svg' }} option={options} onEvents={onEvents} />;
};

export default compose(memo, widgetDataHOC(['company', 'users']))(LicenseAssignments);
