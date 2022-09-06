import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import ReactECharts from 'echarts-for-react';
import { widgetDataHOC } from 'src/hoc';
import * as Styled from './spendByLicense.styled';

const Chart = styled(ReactECharts).attrs({
  style: {
    height: '100%',
    width: '100%'
  }
})``;

const SpendByLicense = ({ company }) => {
  const { plans } = company;
  const data = useMemo(() => {
    return (plans || []).map(plan => {
      return {
        name: plan.name,
        id: plan.name.replace(/ /g, '_').toLowerCase(),
        children: [],
        value: [plan.annualSpend]
      };
    });
  }, [plans]);

  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'treemap',
          name: 'All',
          roam: 'move',
          breadcrumb: {
            top: 0
          },

          label: {
            position: 'insideTopLeft',

            formatter: [
              '{b|{b}}',
              // eslint-disable-next-line no-template-curly-in-string
              '{c|${c}}'
            ].join('\n'),

            rich: {
              b: {
                color: '#000000'
              },
              c: {
                color: '#ffffff'
              }
            }
          },

          levels: [
            {
              color: ['#17CCD8', '#79C7FF', '#E06F74', '#2EFAA4', '#60B06D', '#17CCD8'],
              colorMappingBy: 'id'
            }
          ],

          data
        }
      ]
    };
  }, [data]);

  if (data.length === 0) {
    return (
      <Styled.SpinContainer>
        <Spin />
      </Styled.SpinContainer>
    );
  }

  return <Chart option={options} notMerge={true} />;
};

export default widgetDataHOC(['company', 'plans'])(SpendByLicense);
