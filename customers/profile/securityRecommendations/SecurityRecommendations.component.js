import React, { useMemo } from 'react';
import * as R from 'ramda';
import SimpleTable from 'src/components/simpleTable';
import { sortByAlph, sortByNumber, capitalizeFirstLetter, sortByPriorityMap } from 'src/utils';
import { widgetDataHOC } from 'src/hoc';
import { TABLE_COLUMNS, COL_WIDTHS, langTable } from './securityRecommendations.constants';
import * as Styled from './securityRecommendations.styled';

const impactPriorityMap = { high: 3, moderate: 2, low: 1 };

const SecurityRecommendations = ({ company }) => {
  const tableData = useMemo(() => company.securityRecommendations, [company]);
  const dataSource = tableData ? tableData.map((e, idx) => ({ ...e, key: `security-${idx}` })) : [];

  const columns = useMemo(
    () =>
      R.values(TABLE_COLUMNS).map(dataIndex => {
        return {
          dataIndex,
          key: dataIndex,
          title: langTable[dataIndex],
          width: COL_WIDTHS[dataIndex],
          fixed: dataIndex === TABLE_COLUMNS.IMPROVEMENT_ACTION ? 'left' : 'false',
          sorter: R.cond([
            [R.equals(TABLE_COLUMNS.IMPROVEMENT_ACTION), R.always(sortByAlph(dataIndex))],
            [R.equals(TABLE_COLUMNS.STATUS), R.always(sortByAlph(dataIndex))],
            [R.equals(TABLE_COLUMNS.SCORE), R.always(sortByNumber(dataIndex))],
            [R.equals(TABLE_COLUMNS.MAX_SCORE), R.always(sortByNumber(dataIndex))],
            [R.equals(TABLE_COLUMNS.CONTROL_CATEGORY), R.always(sortByAlph(dataIndex))],
            [R.equals(TABLE_COLUMNS.USER_IMPACT), R.always(sortByPriorityMap(impactPriorityMap)(dataIndex))]
          ])(dataIndex),
          render: (value, record) => {
            switch (dataIndex) {
              case TABLE_COLUMNS.STATUS:
                return <Styled.StatusBadge type={value}>{value}</Styled.StatusBadge>;

              case TABLE_COLUMNS.USER_IMPACT:
                const capitalizedValue = capitalizeFirstLetter(value);
                return <Styled.ImpactBadge impact={capitalizedValue}>{capitalizedValue}</Styled.ImpactBadge>;

              default:
                break;
            }

            return value;
          }
        };
      }),
    []
  );

  const tableProps = {
    columns,
    dataSource,
    loading: !company.securityRecommendations,
    x: 1190
  };

  return <SimpleTable {...tableProps} />;
};

export default widgetDataHOC(['company', 'securityRecommendations'])(SecurityRecommendations);
