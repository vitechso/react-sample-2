import React, { useMemo } from 'react';
import * as R from 'ramda';
import { LanguageEntry } from '@accordo-feed/language.entry';
import SimpleTable from 'src/components/simpleTable';
import { capitalizeFirstLetter, sortByAlph, sortByPriorityMap } from 'src/utils';
import { getLangValues } from './recommendations.util';
import * as Styled from './recommendations.styled';
import { lang, genLang } from './recommendations.lang';

export default ({ company, overrides }) => {
  const { recommendations } = company;

  const columns = [
    {
      title: 'Priority',
      key: 'impact',
      width: '13%',
      dataIndex: 'impact',
      fixed: 'left',
      render: value => (
        <Styled.PriorityBadge priority={value.toLowerCase()}>
          {capitalizeFirstLetter(value.toLowerCase())}
        </Styled.PriorityBadge>
      ),
      sorter: sortByPriorityMap({ high: 3, medium: 2, low: 1 })('impact')
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '15%',
      sorter: sortByAlph('type')
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: description => {
        const { type, variables } = description;
        const recommendationOverride = overrides[type];
        let translateActionItem = recommendationOverride
          ? genLang(type, recommendationOverride.recommendationTemplate)
          : lang.recommendedActions[type];
        let langVariables = getLangValues(variables);
        const quantity = parseFloat(R.pathOr(0, ['quantity'], variables));

        if (translateActionItem.ACTION) {
          const langKey = quantity > 0 ? 'ADDED' : 'REMOVED';
          translateActionItem = lang.recommendedActions[type][langKey];
          langVariables = {
            ...langVariables,
            quantity: Math.abs(parseFloat(quantity.toFixed(2))) // convert to positive value for language entry display
          };
        }

        return <LanguageEntry {...translateActionItem} values={langVariables} />;
      }
    }
  ];

  const dataSource = useMemo(
    () =>
      recommendations.map((item, index) => ({
        ...item,
        key: index
      })),
    [recommendations]
  );

  const tableProps = {
    columns,
    dataSource,
    loading: !recommendations,
    x: 900
  };

  return <SimpleTable {...tableProps} />;
};
