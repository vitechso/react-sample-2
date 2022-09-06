import React, { useState } from 'react';

import Radio from 'src/components/UI/radio';
import Widget from 'src/components/widget';
import SimpleTable from 'src/components/simpleTable';
import { DisplayOptions } from './subscriptions.constants';
import { generateTableColumns } from './subscriptions.config';
import * as Styled from './subscriptions.styled';

const Subscriptions = ({ dataSource }) => {
  const [priceKey, setPriceKey] = useState('msrp');

  const tableProps = {
    columns: generateTableColumns({ priceKey }),
    dataSource,
    loading: !dataSource || dataSource.length === 0,
    x: 1200
  };

  return (
    <Styled.Container>
      <Widget isSubWidget={true}>
        <SimpleTable {...tableProps} />
      </Widget>
      <Styled.DisplayWidget>
        <Styled.DisplayTitle>Display As</Styled.DisplayTitle>
        <Styled.DisplaySelection>
          <Radio options={DisplayOptions} value={priceKey} onChange={e => setPriceKey(e)} />
        </Styled.DisplaySelection>
      </Styled.DisplayWidget>
    </Styled.Container>
  );
};

export default Subscriptions;
