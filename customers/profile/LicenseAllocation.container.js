// @flow

import React, { useMemo, useState } from 'react';
import * as R from 'ramda';

import Dropdown from 'src/components/dropdown';
import M365licensesComp from 'src/pages/dashboard/widgets/M365Licenses/M365licenses.component';
import { widgetDataHOC } from 'src/hoc';
import { M365LICENSES_OPTIONS, M365LICENSES_OPTION_VALUE } from 'src/constants';
import * as Styled from 'src/pages/dashboard/widgets/M365Licenses/m365licenses.styled';

/*****************
 *   COMPONENT   *
 *****************/

const M365licenses = ({ company, ...rest }) => {
  const [selected, setSelected] = useState(M365LICENSES_OPTIONS[0]);

  const plans = R.pathOr([], ['plans'], company);
  const data = useMemo(() => {
    const source = plans
      .map(e => ({ ...e, unassigned: (e.purchased ?? 0) - (e.assigned ?? 0) }))
      .map(e => ({ ...e, value: e[M365LICENSES_OPTION_VALUE[selected]] ?? 0 }));
    const byValue = R.descend(R.prop('value'));
    return R.slice(0, 9, R.sort(byValue, source));
  }, [plans, selected]);

  return (
    <Styled.Wrapper>
      <Styled.DropdownWrapper>
        <Dropdown
          showSearch={false}
          className="m365licenses_dropdown"
          defaultValue={M365LICENSES_OPTIONS[0]}
          data={M365LICENSES_OPTIONS}
          onSelect={e => setSelected(e)}
        />
      </Styled.DropdownWrapper>
      <M365licensesComp data={data} {...rest} />
    </Styled.Wrapper>
  );
};

export default widgetDataHOC(['company', 'plans'])(M365licenses);
