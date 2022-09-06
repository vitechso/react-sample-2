import React, { useMemo } from 'react';
import type { ResourceGroupType } from '../resourcesByGroup/ResourcesByGroup.component';
import * as Styled from './GroupSpend.styled';

/*************
 *   TYPES   *
 *************/

type Props = {
  data: Array<ResourceGroupType>
};

const GroupSpend = ({ data }: Props) => {
  const chartData = useMemo(() => {
    return data.map(resource => {
      return {
        id: resource.resourceGroupName.replace(/ /g, '_').toLowerCase(),
        name: resource.resourceGroupName,
        value: [resource.totalCost.toFixed(2)]
      };
    });
  }, [data]);

  const options = useMemo(() => {
    return {
      series: [
        {
          type: 'treemap',
          name: 'All',
          breadcrumb: { top: 0 },
          label: {
            // eslint-disable-next-line no-template-curly-in-string
            formatter: ['{b|{b}}', '{c|${c}}'].join('\n'),
            rich: {
              b: { color: '#000000', lineHeight: 22 },
              c: { color: '#ffffff' }
            }
          },
          levels: [
            {
              color: [
                '#5470c6',
                '#91cc75',
                '#fac858',
                '#ee6666',
                '#73c0de',
                '#3ba272',
                '#fc8452',
                '#9a60b4',
                '#ea7ccc'
              ],
              colorMappingBy: 'id'
            }
          ],
          data: chartData
        }
      ]
    };
  }, [chartData]);

  return <Styled.Chart option={options} notMerge={true} />;
};

export default GroupSpend;
