import React from 'react';
import { useTranslate } from '@accordo-feed/language.entry';

import SimpleTable from 'src/components/simpleTable';
import Widget from 'src/components/widget';
import { generateTableColumns } from './UtilizationByLastLogin.config';
import lang from './UtilizationByLastLogin.lang';

/*************
 *   TYPES   *
 *************/

type Props = {
  dataSource: Array<Object>
};

/*****************
 *   COMPONENT   *
 *****************/

const UtilizationByLastLogin = ({ dataSource }: Props) => {
  const translate = useTranslate();

  const tableOptions = {
    dataSource,
    columns: generateTableColumns({
      enableSort: true
    }),
    x: 650,
    tableHeight: 250
  };

  return (
    <Widget
      title={translate(lang.widgetTitle)}
      subTitle={translate(lang.widgetSubTitle)}
      direction="horizontal"
      isSubWidget={true}
    >
      <SimpleTable {...tableOptions} />
    </Widget>
  );
};

export default UtilizationByLastLogin;
