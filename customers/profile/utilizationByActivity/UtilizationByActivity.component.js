import React from 'react';
import * as R from 'ramda';
import { useTranslate } from '@accordo-feed/language.entry';

import SimpleTable from 'src/components/simpleTable';
import { generateTableColumns } from './UtilizationByActivity.config';
import lang from './UtilizationByActivity.lang';
import * as Styled from './UtilizationByActivity.styled';

/*************
 *   TYPES   *
 *************/

type Props = {
  dataSource: Array<Object>
};

/*************
 * COMPONENT *
 *************/

const UtilizationByActivity = ({ dataSource }: Props) => {
  const translate = useTranslate();

  const tableData = R.filter(R.prop('storage'), dataSource);

  const tableOptions = {
    dataSource: tableData,
    columns: generateTableColumns({
      enableSort: true
    }),
    x: 560
  };

  return (
    <Styled.CustomWidget
      title={translate(lang.widgetTitle)}
      subTitle={translate(lang.widgetSubTitle)}
      direction="horizontal"
      isSubWidget={true}
    >
      <SimpleTable {...tableOptions} />
    </Styled.CustomWidget>
  );
};

export default UtilizationByActivity;
